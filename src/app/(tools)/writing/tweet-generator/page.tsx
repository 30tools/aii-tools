import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { TweetGeneratorClient } from "./tweet-generator-client";

export const metadata: Metadata = {
  title: "Tweet Generator - Create Engaging Tweets with AI | 30tools",
  description: "Free AI tweet generator to create engaging, viral tweets from any topic. Get multiple tweet variations with hashtags. No signup required.",
  keywords: ["tweet generator", "Twitter content", "AI writing", "social media", "viral tweets", "hashtags"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/writing/tweet-generator",
  },
  openGraph: {
    title: "Tweet Generator - Create Engaging Tweets with AI",
    description: "Free AI tweet generator to create engaging, viral tweets from any topic. Get multiple tweet variations with hashtags.",
    url: "https://ai-tools.30tools.com/writing/tweet-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Tweet Generator",
  "description": "Free AI tool to generate engaging tweets from any topic",
  "url": "https://ai-tools.30tools.com/writing/tweet-generator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Multiple tweet variations",
    "Character count tracking",
    "Hashtag suggestions",
    "Instant generation"
  ]
};

export default function TweetGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="Tweet Generator"
        description="Generate engaging tweets from any topic with AI-powered content creation"
        icon="Twitter"
      >
        <TweetGeneratorClient />
      </ToolContainer>
    </>
  );
}