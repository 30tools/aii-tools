import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { InstagramCaptionClient } from "./instagram-caption-client";

export const metadata: Metadata = {
  title: "Instagram Caption Generator - AI-Powered Social Media Content | 30tools",
  description: "Free AI Instagram caption generator with hashtags and engaging content. Create viral captions that boost engagement. No signup required.",
  keywords: ["Instagram caption generator", "social media content", "Instagram hashtags", "viral captions", "engagement boost", "content creation"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/writing/instagram-caption-generator",
  },
  openGraph: {
    title: "Instagram Caption Generator - AI-Powered Social Media Content",
    description: "Free AI Instagram caption generator with hashtags and engaging content. Create viral captions that boost engagement.",
    url: "https://ai-tools.30tools.com/writing/instagram-caption-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Instagram Caption Generator",
  "description": "AI tool to generate engaging Instagram captions with relevant hashtags",
  "url": "https://ai-tools.30tools.com/writing/instagram-caption-generator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Engaging captions",
    "Hashtag suggestions",
    "Multiple variations",
    "Emoji integration"
  ]
};

export default function InstagramCaptionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="Instagram Caption Generator"
        description="Create engaging Instagram captions with relevant hashtags to boost your social media presence"
        icon="Instagram"
      >
        <InstagramCaptionClient />
      </ToolContainer>
    </>
  );
}