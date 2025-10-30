import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { RoastBioClient } from "./roast-bio-client";

export const metadata: Metadata = {
  title: "Roast My Bio - Humorous Bio Analysis Tool | 30tools",
  description: "Free AI bio roaster that gives your social media bio a fun, witty roast. Get entertaining feedback on your profile. No signup required.",
  keywords: ["roast my bio", "bio roaster", "funny bio analysis", "social media humor", "profile roast", "witty feedback", "entertainment tool"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/fun/roast-my-bio",
  },
  openGraph: {
    title: "Roast My Bio - Humorous Bio Analysis Tool",
    description: "Free AI bio roaster that gives your social media bio a fun, witty roast. Get entertaining feedback on your profile.",
    url: "https://ai-tools.30tools.com/fun/roast-my-bio",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Roast My Bio",
  "description": "AI tool to provide humorous and witty feedback on social media bios",
  "url": "https://ai-tools.30tools.com/fun/roast-my-bio",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Witty humor",
    "Constructive feedback",
    "Entertainment value",
    "Social media analysis"
  ]
};

export default function RoastBioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="Roast My Bio"
        description="Get a humorous, friendly roast of your social media bio with witty AI-powered feedback"
        icon="Flame"
      >
        <RoastBioClient />
      </ToolContainer>
    </>
  );
}