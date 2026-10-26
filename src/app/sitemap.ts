import type { MetadataRoute } from "next";

const BASE_URL = "https://www.michielmaessen.com";

const routes = [
  "",
  "/portfolio",
  "/portfolio/festival",
  "/portfolio/auto",
  "/portfolio/model",
  "/portfolio/webshop",
  "/portfolio/vrij-werk",
  "/360",
  "/contact",
  "/links",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    entries.push({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          nl: `${BASE_URL}${route}`,
          en: `${BASE_URL}/en${route}`,
        },
      },
    });
  }

  return entries;
}
