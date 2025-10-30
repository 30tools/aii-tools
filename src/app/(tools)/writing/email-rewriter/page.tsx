import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { EmailRewriterClient } from "./email-rewriter-client";

export const metadata: Metadata = {
  title: "Email Rewriter - Professional Email Enhancement Tool | 30tools",
  description: "Free AI email rewriter to make emails more polite, persuasive, or concise. Improve your professional communication instantly. No signup required.",
  keywords: ["email rewriter", "professional emails", "email enhancement", "business communication", "email tone", "persuasive writing"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/writing/email-rewriter",
  },
  openGraph: {
    title: "Email Rewriter - Professional Email Enhancement Tool",
    description: "Free AI email rewriter to make emails more polite, persuasive, or concise. Improve your professional communication instantly.",
    url: "https://ai-tools.30tools.com/writing/email-rewriter",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Email Rewriter",
  "description": "AI tool to enhance and rewrite emails for better professional communication",
  "url": "https://ai-tools.30tools.com/writing/email-rewriter",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Tone adjustment",
    "Professional language",
    "Clarity improvement",
    "Multiple styles"
  ]
};

export default function EmailRewriterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="Email Rewriter"
        description="Enhance your emails to be more polite, persuasive, or concise with AI-powered rewriting"
        icon="Mail"
      >
        <EmailRewriterClient />
      </ToolContainer>
    </>
  );
}