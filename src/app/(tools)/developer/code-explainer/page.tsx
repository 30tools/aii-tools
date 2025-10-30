import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { CodeExplainerClient } from "./code-explainer-client";

export const metadata: Metadata = {
  title: "Code Explainer - AI-Powered Code Analysis Tool | 30tools",
  description: "Free AI code explainer that breaks down any code snippet into plain English. Understand programming concepts easily. No signup required.",
  keywords: ["code explainer", "code analysis", "programming help", "code documentation", "learn coding", "understand code", "developer tools"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/tools/developer/code-explainer",
  },
  openGraph: {
    title: "Code Explainer - AI-Powered Code Analysis Tool",
    description: "Free AI code explainer that breaks down any code snippet into plain English. Understand programming concepts easily.",
    url: "https://ai-tools.30tools.com/tools/developer/code-explainer",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Code Explainer",
  "description": "AI tool to explain code snippets in simple terms for better understanding",
  "url": "https://ai-tools.30tools.com/tools/developer/code-explainer",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Plain English explanations",
    "Line by line breakdown",
    "Concept explanation",
    "Multi-language support"
  ]
};

export default function CodeExplainerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="Code Explainer"
        description="Understand any code snippet with AI-powered explanations in plain English"
        icon="Code2"
      >
        <CodeExplainerClient />
      </ToolContainer>
    </>
  );
}