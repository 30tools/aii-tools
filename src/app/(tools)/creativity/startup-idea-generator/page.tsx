import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { StartupIdeaClient } from "./startup-idea-client";

export const metadata: Metadata = {
  title: "Startup Idea Generator - AI-Powered Business Concepts | 30tools",
  description: "Free AI startup idea generator for innovative business concepts. Get market-validated startup ideas with analysis. No signup required.",
  keywords: ["startup idea generator", "business ideas", "entrepreneurship", "startup concepts", "business opportunities", "innovation", "market validation"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/creativity/startup-idea-generator",
  },
  openGraph: {
    title: "Startup Idea Generator - AI-Powered Business Concepts",
    description: "Free AI startup idea generator for innovative business concepts. Get market-validated startup ideas with analysis.",
    url: "https://ai-tools.30tools.com/creativity/startup-idea-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Startup Idea Generator",
  "description": "AI tool to generate innovative startup and business ideas with market analysis",
  "url": "https://ai-tools.30tools.com/creativity/startup-idea-generator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Market analysis",
    "Unique concepts",
    "Validation tips",
    "Industry insights"
  ]
};

export default function StartupIdeaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="Startup Idea Generator"
        description="Generate innovative startup ideas around any keyword or industry with AI-powered market insights"
        icon="Rocket"
      >
        <StartupIdeaClient />
      </ToolContainer>
    </>
  );
}