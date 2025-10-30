import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const SITE = "https://ai-tools.30tools.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}

