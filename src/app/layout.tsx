import type { Metadata, Viewport } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-tools.30tools.com"),
  title: {
    default: "30tools - Free AI Tools Collection | Best AI Utilities 2025",
    template: "%s | 30tools - Free AI Tools"
  },
  description: "Discover 30+ free AI tools for writing, creativity, coding, and productivity. ChatGPT-powered utilities including text summarizer, paraphraser, tweet generator, and more. No signup required.",
  keywords: [
    "AI tools", "free AI tools", "ChatGPT tools", "AI writing", "AI productivity",
    "text summarizer", "paraphraser", "tweet generator", "AI utilities",
    "artificial intelligence", "machine learning tools", "content creation",
    "writing assistant", "AI chatbot", "free online tools"
  ],
  authors: [{ name: "Shaswat Raj", url: "https://ai-tools.30tools.com" }],
  creator: "Shaswat Raj",
  publisher: "30tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-tools.30tools.com",
    siteName: "30tools",
    title: "30tools - Free AI Tools Collection | Best AI Utilities 2025",
    description: "Discover 30+ free AI tools for writing, creativity, coding, and productivity. ChatGPT-powered utilities with no signup required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "30tools - Free AI Tools Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "30tools - Free AI Tools Collection | Best AI Utilities 2025",
    description: "Discover 30+ free AI tools for writing, creativity, coding, and productivity. ChatGPT-powered utilities with no signup required.",
    images: ["/og-image.png"],
    creator: "@30tools",
  },
  alternates: {
    canonical: "https://ai-tools.30tools.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "google-adsense-account": "ca-pub-1828915420581549",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "30tools",
    startupImage: [
      {
        url: "/icons/splash-750x1334.png",
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/icons/splash-1242x2208.png",
        media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/icons/splash-1125x2436.png",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/icons/splash-1536x2048.png",
        media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/icons/splash-1668x2224.png",
        media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/icons/splash-2048x2732.png",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "30tools",
  "description": "Free AI tools collection for writing, creativity, coding, and productivity",
  "url": "https://ai-tools.30tools.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ai-tools.30tools.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "30tools",
    "url": "https://ai-tools.30tools.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ai-tools.30tools.com/icons/icon-512x512.png"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1828915420581549"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-inter antialiased`}><StackProvider app={stackClientApp}><StackTheme>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </StackTheme></StackProvider></body>
    </html>
  );
}
