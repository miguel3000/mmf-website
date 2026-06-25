"use client";

import { useState, useMemo } from "react";

interface Recipe {
  name: string;
  file: string;
  category: string;
}

const CATEGORY_ORDER = [
  "Alles",
  "Hoofdgerecht",
  "Bijgerecht",
  "Soep",
  "Salade",
  "Saus & Dip",
  "Snack",
  "Brood",
  "Dessert",
  "Ontbijt",
  "Drank",
  "Conserveren",
];

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Alles");

  // Only show categories that have recipes
  const availableCategories = useMemo(() => {
    const cats = new Set(recipes.map((r) => r.category));
    return CATEGORY_ORDER.filter((c) => c === "Alles" || cats.has(c));
  }, [recipes]);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchesSearch = r.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "Alles" || r.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [recipes, search, activeCategory]);

  return (
    <section className="max-w-2xl mx-auto px-6 pb-20">
      <div className="sticky top-0 z-10 bg-white pt-4 pb-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Zoek een recept..."
          className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-primary placeholder:text-muted focus:outline-none focus:border-secondary transition-colors"
        />

        {/* Category filter chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {availableCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === "Alles"
                ? recipes.length
                : recipes.filter((r) => r.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-muted hover:bg-gray-200 hover:text-primary"
                }`}
              >
                {cat}{" "}
                <span className={isActive ? "text-white/70" : "text-muted/60"}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-2 text-xs text-muted">
          {filtered.length} {filtered.length === 1 ? "recept" : "recepten"}
          {activeCategory !== "Alles" && ` in ${activeCategory}`}
        </p>
      </div>

      <ul className="mt-2 divide-y divide-border">
        {filtered.map((recipe) => (
          <li key={recipe.file}>
            <a
              href={`/recepten/${encodeURIComponent(recipe.file)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-3 group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm text-primary group-hover:text-secondary transition-colors truncate">
                  {recipe.name}
                </span>
              </div>
              <svg
                className="w-4 h-4 text-muted group-hover:text-secondary transition-colors shrink-0 ml-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-center text-muted text-sm mt-8">
          Geen recepten gevonden.
        </p>
      )}
    </section>
  );
}
