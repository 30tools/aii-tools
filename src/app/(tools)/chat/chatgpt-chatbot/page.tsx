import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { ChatbotClient } from "./chatbot-client";

export const metadata: Metadata = {
  title: "ChatGPT Chatbot - Free AI Assistant | 30tools",
  description: "Free ChatGPT-powered AI chatbot for intelligent conversations. Get instant answers, creative help, and problem-solving assistance. No signup required.",
  keywords: ["ChatGPT chatbot", "AI assistant", "AI chat", "intelligent conversations", "AI help", "virtual assistant", "question answering"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/tools/chat/chatgpt-chatbot",
  },
  openGraph: {
    title: "ChatGPT Chatbot - Free AI Assistant",
    description: "Free ChatGPT-powered AI chatbot for intelligent conversations. Get instant answers, creative help, and problem-solving assistance.",
    url: "https://ai-tools.30tools.com/tools/chat/chatgpt-chatbot",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ChatGPT Chatbot",
  "description": "Free AI-powered chatbot for intelligent conversations and assistance",
  "url": "https://ai-tools.30tools.com/tools/chat/chatgpt-chatbot",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Natural conversation",
    "Context awareness",
    "Multi-topic support",
    "Instant responses"
  ]
};

export default function ChatbotPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="ChatGPT Chatbot"
        description="Have intelligent conversations with our AI assistant powered by ChatGPT technology"
        icon="MessageSquare"
      >
        <ChatbotClient />
      </ToolContainer>
    </>
  );
}