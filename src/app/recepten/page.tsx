import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import RecipeList from "./RecipeList";

export const metadata: Metadata = {
  title: "Recepten",
  description: "Receptenverzameling. Mediterrane en Midden-Oosterse keuken.",
};

function getRecipes() {
  const dir = path.join(process.cwd(), "public", "recepten");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".pdf"));

  // Load categories (supports both "Cat" and ["Cat1", "Cat2"] values)
  const catPath = path.join(process.cwd(), "public", "recipe-categories.json");
  const categories: Record<string, string | string[]> = JSON.parse(
    fs.readFileSync(catPath, "utf-8")
  );

  return files
    .map((f) => {
      const name = f.replace(/\.pdf$/, "");
      const raw = categories[name];
      const cats = Array.isArray(raw) ? raw : [raw || "Bijgerecht"];
      return { name, file: f, categories: cats };
    })
    .sort((a, b) =>
      a.name.replace(/^[^a-zA-Z]+/, "").localeCompare(
        b.name.replace(/^[^a-zA-Z]+/, ""),
        "nl"
      )
    );
}

export default function ReceptenPage() {
  const recipes = getRecipes();

  return (
    <div className="min-h-screen">
      <section className="max-w-2xl mx-auto px-6 pt-28 pb-6 text-center">
        <h1 className="font-heading text-5xl sm:text-6xl tracking-wider text-primary dark:text-white/90">
          RECEPTEN
        </h1>
        <p className="mt-3 text-secondary dark:text-white/50 text-sm">
          Receptenverzameling — {recipes.length} recepten
        </p>
      </section>

      <RecipeList recipes={recipes} />
    </div>
  );
}
