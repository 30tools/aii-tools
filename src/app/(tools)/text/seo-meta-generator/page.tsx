import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { SEOMetaClient } from "./seo-meta-client";

export const metadata: Metadata = {
  title: "SEO Meta Generator - Title & Description Optimizer | 30tools",
  description: "Free AI SEO meta generator for title tags and meta descriptions. Optimize your content for search engines with perfect meta tags. No signup required.",
  keywords: ["SEO meta generator", "meta title generator", "meta description generator", "SEO optimization", "search engine optimization", "title tags", "meta tags"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/text/seo-meta-generator",
  },
  openGraph: {
    title: "SEO Meta Generator - Title & Description Optimizer",
    description: "Free AI SEO meta generator for title tags and meta descriptions. Optimize your content for search engines with perfect meta tags.",
    url: "https://ai-tools.30tools.com/text/seo-meta-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SEO Meta Generator",
  "description": "AI tool to generate optimized SEO title tags and meta descriptions",
  "url": "https://ai-tools.30tools.com/text/seo-meta-generator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "SEO optimized titles",
    "Character limits",
    "Keyword integration",
    "Click-worthy copy"
  ]
};

export default function SEOMetaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="SEO Meta Generator"
        description="Generate SEO-optimized title tags and meta descriptions for better search engine rankings"
        icon="Search"
      >
        <SEOMetaClient />
      </ToolContainer>
    </>
  );
}