import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { SummarizerClient } from "./summarizer-client";

export const metadata: Metadata = {
  title: "Text Summarizer - AI-Powered Text Summary Tool | 30tools",
  description: "Free AI text summarizer to create short, medium, or long summaries. Extract key points from any text instantly. No signup required.",
  keywords: ["text summarizer", "AI summary", "summarize text", "key points", "text analysis", "document summary"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/tools/text/summarizer",
  },
  openGraph: {
    title: "Text Summarizer - AI-Powered Text Summary Tool",
    description: "Free AI text summarizer to create short, medium, or long summaries. Extract key points from any text instantly.",
    url: "https://ai-tools.30tools.com/tools/text/summarizer",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Summarizer",
  "description": "Free AI tool to summarize text and extract key points",
  "url": "https://ai-tools.30tools.com/tools/text/summarizer",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Multiple summary lengths",
    "Key points extraction",
    "Accuracy focused",
    "Instant results"
  ]
};

export default function SummarizerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="Text Summarizer"
        description="Generate concise summaries from long text with AI-powered analysis"
        icon="FileText"
      >
        <SummarizerClient />
      </ToolContainer>
    </>
  );
}