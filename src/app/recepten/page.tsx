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

  // Load categories
  const catPath = path.join(process.cwd(), "public", "recipe-categories.json");
  const categories: Record<string, string> = JSON.parse(
    fs.readFileSync(catPath, "utf-8")
  );

  return files
    .map((f) => ({
      name: f.replace(/\.pdf$/, ""),
      file: f,
      category: categories[f.replace(/\.pdf$/, "")] || "Bijgerecht",
    }))
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
        <h1 className="font-heading text-5xl sm:text-6xl tracking-wider text-primary">
          RECEPTEN
        </h1>
        <p className="mt-3 text-secondary text-sm">
          Receptenverzameling — {recipes.length} recepten
        </p>
      </section>

      <RecipeList recipes={recipes} />
    </div>
  );
}
