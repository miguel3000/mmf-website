"use client";

import { useState } from "react";

interface Recipe {
  name: string;
  file: string;
}

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  const [search, setSearch] = useState("");

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <p className="mt-2 text-xs text-muted">
          {filtered.length} {filtered.length === 1 ? "recept" : "recepten"}
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
              <span className="text-sm text-primary group-hover:text-secondary transition-colors">
                {recipe.name}
              </span>
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
