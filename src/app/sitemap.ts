import type { MetadataRoute } from "next";
import toolsData from "@/lib/tools.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE = "https://ai-tools.30tools.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/tools`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = toolsData.categories.map((c) => ({
    url: `${SITE}/categories/${c.id}`,
    lastModified: now,
    priority: 0.7,
  }));

  const toolRoutes: MetadataRoute.Sitemap = toolsData.tools.map((t) => ({
    url: `${SITE}${t.url}`,
    lastModified: now,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes];
}

