"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 px-4 text-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full border bg-background/50 text-sm mb-8">
          <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
          30+ AI Tools • Free Forever • No Signup Required
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Free AI Tools for{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Everything
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover 30+ powerful AI tools for writing, creativity, coding, and productivity. 
          All powered by ChatGPT, completely free, and ready to use instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="#tools">
              Explore All Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
            <Link href="/tools/chat/chatgpt-chatbot">
              Try ChatGPT Bot
              <Zap className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">30+</div>
            <div className="text-muted-foreground">AI Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Free</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">0</div>
            <div className="text-muted-foreground">Signup Required</div>
          </div>
        </div>
      </div>
    </section>
  );
}