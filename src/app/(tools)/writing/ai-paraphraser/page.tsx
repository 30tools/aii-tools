import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { ParaphraserClient } from "./paraphraser-client";

export const metadata: Metadata = {
  title: "AI Paraphraser - Rewrite Text with Different Tones | 30tools",
  description: "Free AI paraphraser to rewrite text in formal, casual, or funny tones. Maintain meaning while changing style. No signup required.",
  keywords: ["paraphraser", "rewrite text", "AI writing", "text rewriter", "tone changer", "free paraphrasing tool"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/tools/writing/ai-paraphraser",
  },
  openGraph: {
    title: "AI Paraphraser - Rewrite Text with Different Tones",
    description: "Free AI paraphraser to rewrite text in formal, casual, or funny tones. Maintain meaning while changing style.",
    url: "https://ai-tools.30tools.com/tools/writing/ai-paraphraser",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI Paraphraser",
  "description": "Free AI tool to paraphrase and rewrite text with different tones",
  "url": "https://ai-tools.30tools.com/tools/writing/ai-paraphraser",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Multiple tone options",
    "Instant results",
    "Copy to clipboard",
    "No signup required"
  ]
};

export default function ParaphraserPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="AI Paraphraser"
        description="Rewrite text with different tones while maintaining the original meaning"
        icon="RotateCcw"
      >
        <ParaphraserClient />
      </ToolContainer>
    </>
  );
}