import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { ColdDMClient } from "./cold-dm-client";

export const metadata: Metadata = {
  title: "Cold DM Generator - Professional Outreach Messages | 30tools",
  description: "Free AI cold DM generator for Twitter and LinkedIn outreach. Create personalized messages that get responses. No signup required.",
  keywords: ["cold DM generator", "outreach messages", "LinkedIn outreach", "Twitter DM", "networking", "lead generation", "sales outreach"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/tools/writing/cold-dm-generator",
  },
  openGraph: {
    title: "Cold DM Generator - Professional Outreach Messages",
    description: "Free AI cold DM generator for Twitter and LinkedIn outreach. Create personalized messages that get responses.",
    url: "https://ai-tools.30tools.com/tools/writing/cold-dm-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Cold DM Generator",
  "description": "AI tool to generate effective cold outreach messages for social media platforms",
  "url": "https://ai-tools.30tools.com/tools/writing/cold-dm-generator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Personalized messages",
    "High conversion rates",
    "Platform optimization",
    "Professional tone"
  ]
};

export default function ColdDMPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="Cold DM Generator"
        description="Create effective outreach messages for Twitter and LinkedIn that get responses"
        icon="Send"
      >
        <ColdDMClient />
      </ToolContainer>
    </>
  );
}