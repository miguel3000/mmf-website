import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/recepten/",
    },
    sitemap: "https://www.michielmaessen.com/sitemap.xml",
  };
}
