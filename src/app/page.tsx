import { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { ToolsGrid } from "@/components/home/tools-grid";
import { FeaturesSection } from "@/components/home/features-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";
import { PWAOfflineIndicator } from "@/components/pwa-offline-indicator";
import { PWAUpdatePrompt } from "@/components/pwa-update-prompt";
import toolsData from "@/lib/tools.json";

export const metadata: Metadata = {
  title: "30tools - 150+ Free AI Tools Collection | Best AI Utilities 2025",
  description: "Discover 150+ free AI tools for writing, creativity, coding, SEO, design, and productivity. ChatGPT-powered utilities including text summarizer, paraphraser, tweet generator, and more. No signup required.",
  alternates: {
    canonical: "https://ai-tools.30tools.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "30tools",
  "description": "Free AI tools collection for writing, creativity, coding, and productivity",
  "url": "https://ai-tools.30tools.com",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": toolsData.tools.length,
    "itemListElement": toolsData.tools.map((tool, index) => ({
      "@type": "SoftwareApplication",
      "position": index + 1,
      "name": tool.title,
      "description": tool.description,
      "url": `https://ai-tools.30tools.com${tool.url}`,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }))
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PWAOfflineIndicator />
      <PWAUpdatePrompt />
      <Header />
      <main>
        <HeroSection />
        <ToolsGrid />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <PWAInstallPrompt />
    </div>
  );
}
