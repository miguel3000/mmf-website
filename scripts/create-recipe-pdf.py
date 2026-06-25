#!/usr/bin/env python3
"""
Generate a clean recipe PDF matching the michielmaessen.com recipe style.

Usage:
    python3 create-recipe-pdf.py --title "Recipe Name" \
        --portions 4 --prep 10 --cook 30 \
        --ingredients "ingredient 1" "ingredient 2" ... \
        --steps "Step one text." "Step two text." ... \
        [--notes "Optional notes text."] \
        [--cuisine "Keuken type"] \
        [--output /path/to/output.pdf]

If --output is omitted, saves to public/recepten/<title>.pdf
"""

import argparse
import os
import sys

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF not installed. Run: pip install pymupdf")
    sys.exit(1)


# === Layout constants (A4, matching existing recipe PDFs) ===
PAGE_W, PAGE_H = 595.28, 841.89
MARGIN_LEFT = 31.2
MARGIN_RIGHT = 564.0
TEXT_WIDTH = MARGIN_RIGHT - MARGIN_LEFT
STEP_INDENT = 59.5

# Colors
COLOR_TITLE = (0x4a / 255, 0x37 / 255, 0x28 / 255)       # #4a3728 brown
COLOR_SECTION = (0x6b / 255, 0x4e / 255, 0x37 / 255)      # #6b4e37 section headers
COLOR_STEP_NUM = (0x8b / 255, 0x73 / 255, 0x55 / 255)      # #8b7355 step numbers
COLOR_BODY = (0x2c / 255, 0x2c / 255, 0x2c / 255)          # #2c2c2c body text
COLOR_META = (0x64 / 255, 0x64 / 255, 0x64 / 255)          # #646464 meta info
COLOR_LINE = (0x6b / 255, 0x4e / 255, 0x37 / 255)          # brown divider line

# Fonts & sizes
FONT_TITLE_SIZE = 20.0
FONT_SECTION_SIZE = 14.0
FONT_BODY_SIZE = 10.0
FONT_META_SIZE = 9.0
LINE_HEIGHT = 15.6  # body text line spacing


def create_recipe_pdf(
    title: str,
    portions: int,
    prep_time: int,
    cook_time: int,
    ingredients: list[str],
    steps: list[str],
    cuisine: str = "",
    notes: str = "",
    output_path: str = "",
):
    doc = fitz.open()
    page = doc.new_page(width=PAGE_W, height=PAGE_H)
    y = 27.0

    # --- Title (centered, bold) ---
    font_bold = fitz.Font("hebo")
    font_reg = fitz.Font("helv")
    title_w = font_bold.text_length(title, fontsize=FONT_TITLE_SIZE)
    title_x = (PAGE_W - title_w) / 2
    page.insert_text(
        fitz.Point(title_x, y + FONT_TITLE_SIZE),
        title, fontname="hebo", fontsize=FONT_TITLE_SIZE, color=COLOR_TITLE,
    )
    y += FONT_TITLE_SIZE + 15

    # --- Brown divider line ---
    page.draw_line(
        fitz.Point(70.87, y), fitz.Point(524.41, y),
        color=COLOR_LINE, width=1.5,
    )
    y += 20

    # --- Meta info (centered) ---
    total_time = prep_time + cook_time
    meta_parts = []
    if portions:
        meta_parts.append(f"Porties: {portions}")
    meta_parts.append(f"Voorbereiding: {prep_time}")
    meta_parts.append(f"Bereiding: {cook_time}")
    meta_parts.append(f"Totale tijd: {total_time}")
    meta_text = "    ".join(meta_parts)

    meta_w = font_reg.text_length(meta_text, fontsize=FONT_META_SIZE)
    meta_x = (PAGE_W - meta_w) / 2
    page.insert_text(
        fitz.Point(meta_x, y + FONT_META_SIZE),
        meta_text, fontname="helv", fontsize=FONT_META_SIZE, color=COLOR_META,
    )
    y += 25

    if cuisine:
        cuisine_text = f"Keuken: {cuisine}"
        cuisine_w = font_reg.text_length(cuisine_text, fontsize=FONT_META_SIZE)
        cuisine_x = (PAGE_W - cuisine_w) / 2
        page.insert_text(
            fitz.Point(cuisine_x, y + FONT_META_SIZE),
            cuisine_text, fontname="helv", fontsize=FONT_META_SIZE, color=COLOR_META,
        )
        y += 20

    y += 15

    # --- Ingredienten header ---
    page.insert_text(
        fitz.Point(MARGIN_LEFT, y + FONT_SECTION_SIZE),
        "Ingredienten",
        fontname="hebo", fontsize=FONT_SECTION_SIZE,
        color=COLOR_SECTION,
    )
    y += FONT_SECTION_SIZE + 4

    # Underline
    page.draw_line(
        fitz.Point(MARGIN_LEFT, y + 8),
        fitz.Point(283.46, y + 8),
        color=COLOR_LINE, width=0.5,
    )
    y += 18

    # --- Ingredient list ---
    for ing in ingredients:
        if y > PAGE_H - 50:
            page = doc.new_page(width=PAGE_W, height=PAGE_H)
            y = 30
        page.insert_text(
            fitz.Point(MARGIN_LEFT, y + FONT_BODY_SIZE),
            "-  ", fontname="helv", fontsize=FONT_BODY_SIZE, color=COLOR_BODY,
        )
        page.insert_text(
            fitz.Point(48.2, y + FONT_BODY_SIZE),
            ing, fontname="helv", fontsize=FONT_BODY_SIZE, color=COLOR_BODY,
        )
        y += 17.0

    y += 12

    # --- Bereiding header ---
    if y > PAGE_H - 80:
        page = doc.new_page(width=PAGE_W, height=PAGE_H)
        y = 30

    page.insert_text(
        fitz.Point(MARGIN_LEFT, y + FONT_SECTION_SIZE),
        "Bereiding",
        fontname="hebo", fontsize=FONT_SECTION_SIZE,
        color=COLOR_SECTION,
    )
    y += FONT_SECTION_SIZE + 4

    page.draw_line(
        fitz.Point(MARGIN_LEFT, y + 8),
        fitz.Point(283.46, y + 8),
        color=COLOR_LINE, width=0.5,
    )
    y += 22

    # --- Steps ---
    step_text_width = MARGIN_RIGHT - STEP_INDENT
    for i, step in enumerate(steps, 1):
        if y > PAGE_H - 60:
            page = doc.new_page(width=PAGE_W, height=PAGE_H)
            y = 30

        # Step number
        page.insert_text(
            fitz.Point(MARGIN_LEFT, y + FONT_BODY_SIZE),
            f"{i}.",
            fontname="hebo", fontsize=FONT_BODY_SIZE,
            color=COLOR_STEP_NUM,
        )

        # Step text (wrapped)
        step_rect = fitz.Rect(STEP_INDENT, y, MARGIN_RIGHT, PAGE_H - 40)
        rc = page.insert_textbox(
            step_rect, step,
            fontname="helv", fontsize=FONT_BODY_SIZE,
            color=COLOR_BODY, align=fitz.TEXT_ALIGN_LEFT,
        )
        # Calculate how much vertical space the text used
        # rc < 0 means overflow, otherwise it's remaining space
        text_lines = len(step) / (step_text_width / (FONT_BODY_SIZE * 0.5))
        approx_lines = max(1, int(text_lines) + 1)
        y += max(LINE_HEIGHT, approx_lines * LINE_HEIGHT) + 5

    # --- Notes (optional) ---
    if notes:
        y += 10
        if y > PAGE_H - 80:
            page = doc.new_page(width=PAGE_W, height=PAGE_H)
            y = 30

        page.insert_text(
            fitz.Point(MARGIN_LEFT, y + FONT_SECTION_SIZE),
            "Notes",
            fontname="hebo", fontsize=FONT_SECTION_SIZE,
            color=COLOR_SECTION,
        )
        y += FONT_SECTION_SIZE + 14

        notes_rect = fitz.Rect(MARGIN_LEFT, y, MARGIN_RIGHT, PAGE_H - 40)
        page.insert_textbox(
            notes_rect, notes,
            fontname="helv", fontsize=FONT_BODY_SIZE,
            color=COLOR_BODY, align=fitz.TEXT_ALIGN_LEFT,
        )

    # Save
    if not output_path:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_dir = os.path.dirname(script_dir)
        output_path = os.path.join(project_dir, "public", "recepten", f"{title}.pdf")

    doc.save(output_path, deflate=True)
    doc.close()
    print(f"Created: {output_path}")
    return output_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a recipe PDF")
    parser.add_argument("--title", required=True)
    parser.add_argument("--portions", type=int, default=4)
    parser.add_argument("--prep", type=int, default=0, help="Prep time in minutes")
    parser.add_argument("--cook", type=int, default=0, help="Cook time in minutes")
    parser.add_argument("--ingredients", nargs="+", required=True)
    parser.add_argument("--steps", nargs="+", required=True)
    parser.add_argument("--cuisine", default="")
    parser.add_argument("--notes", default="")
    parser.add_argument("--output", default="")
    args = parser.parse_args()

    create_recipe_pdf(
        title=args.title,
        portions=args.portions,
        prep_time=args.prep,
        cook_time=args.cook,
        ingredients=args.ingredients,
        steps=args.steps,
        cuisine=args.cuisine,
        notes=args.notes,
        output_path=args.output,
    )
