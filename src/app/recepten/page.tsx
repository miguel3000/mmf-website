import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import RecipeList from "./RecipeList";

export const metadata: Metadata = {
  title: "Recepten - a la Damaris",
  description:
    "Receptenverzameling van restaurant a la Damaris. Mediterrane en Midden-Oosterse keuken.",
};

function getRecipes() {
  const dir = path.join(process.cwd(), "public", "recepten");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".pdf"));
  return files
    .map((f) => ({
      name: f.replace(/\.pdf$/, ""),
      file: f,
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
          Receptenverzameling van{" "}
          <span className="italic">a la Damaris</span> — {recipes.length}{" "}
          recepten
        </p>
      </section>

      <RecipeList recipes={recipes} />
    </div>
  );
}
