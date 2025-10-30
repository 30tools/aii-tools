import { Metadata } from "next";
import { ToolsGrid } from "@/components/home/tools-grid";

export const metadata: Metadata = {
    title: "All AI Tools | 30tools - Complete Collection of Free AI Utilities",
    description: "Browse all 150+ free AI tools in one place. Writing, SEO, design, development, business tools and more. All powered by ChatGPT and completely free.",
};

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">All AI Tools</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Browse our complete collection of 150+ free AI tools.
                        All tools are powered by ChatGPT and ready to use instantly.
                    </p>
                </div>

                {/* Tools Grid */}
                <ToolsGrid />
            </div>
        </div>
    );
}