import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Heart, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About 30tools - Free AI Tools Platform | Our Story and Mission",
  description: "Learn about 30tools, the free AI tools platform helping thousands of users boost productivity with ChatGPT-powered utilities. Discover our mission and story.",
  keywords: ["about 30tools", "AI tools platform", "our mission", "free AI utilities", "productivity tools"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About 30tools</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to democratize AI tools and make powerful artificial intelligence accessible to everyone, completely free.
            </p>
          </div>

          {/* Story */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-red-500" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                30tools was born from a simple frustration: why should powerful AI tools be locked behind expensive subscriptions? 
                In late 2024, our founder Shaswat Raj noticed that while AI technology was advancing rapidly, access to practical 
                AI tools remained limited to those who could afford premium plans.
              </p>
              <p>
                We decided to change that. Using the power of modern web technologies and AI APIs, we built a platform that 
                offers 30+ professional-grade AI tools completely free, with no accounts, no subscriptions, and no limitations.
              </p>
              <p>
                Today, thousands of writers, developers, students, and professionals use 30tools daily to boost their productivity 
                and creativity. Every tool is carefully designed to solve real problems and deliver instant value.
              </p>
            </CardContent>
          </Card>

          {/* Mission & Values */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To democratize access to AI tools and empower everyone to harness the power of artificial intelligence 
                  for their personal and professional growth, without barriers or costs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-500" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Free Forever:</strong> No hidden costs or premium tiers</li>
                  <li>• <strong>Privacy First:</strong> Your data is never stored or tracked</li>
                  <li>• <strong>Quality:</strong> Every tool is tested and refined</li>
                  <li>• <strong>Accessibility:</strong> Simple, clean, and intuitive design</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Team */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Meet the Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SR</span>
                </div>
                <div>
                  <h3 className="font-semibold">Shaswat Raj</h3>
                  <p className="text-muted-foreground">Founder & Developer</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Full-stack developer passionate about AI and building tools that make a difference.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Free</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Available</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}