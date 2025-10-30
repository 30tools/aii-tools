import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { LinkedInFormatterClient } from "./linkedin-formatter-client";

export const metadata: Metadata = {
  title: "LinkedIn Post Formatter - Professional Social Media Content | 30tools",
  description: "Free AI LinkedIn post formatter with emojis, structure, and hashtags. Transform any content into engaging professional posts. No signup required.",
  keywords: ["LinkedIn post formatter", "professional content", "social media formatting", "LinkedIn marketing", "business posts", "professional writing"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/writing/linkedin-post-formatter",
  },
  openGraph: {
    title: "LinkedIn Post Formatter - Professional Social Media Content",
    description: "Free AI LinkedIn post formatter with emojis, structure, and hashtags. Transform any content into engaging professional posts.",
    url: "https://ai-tools.30tools.com/writing/linkedin-post-formatter",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LinkedIn Post Formatter",
  "description": "AI tool to format professional LinkedIn posts with optimal structure and engagement",
  "url": "https://ai-tools.30tools.com/writing/linkedin-post-formatter",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Professional formatting",
    "Emoji integration",
    "Hashtag optimization",
    "Engagement optimization"
  ]
};

export default function LinkedInFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="LinkedIn Post Formatter"
        description="Transform your content into professional, engaging LinkedIn posts with optimal formatting"
        icon="Linkedin"
      >
        <LinkedInFormatterClient />
      </ToolContainer>
    </>
  );
}