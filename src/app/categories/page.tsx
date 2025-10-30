import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import toolsData from "@/lib/tools.json";

export const metadata: Metadata = {
    title: "AI Tool Categories | 30tools - Free AI Utilities",
    description: "Browse AI tools by category: Writing, SEO, Design, Development, Business, and more. Find the perfect AI tool for your needs.",
};

interface IconProps {
    name: string;
    className?: string;
}

function DynamicIcon({ name, className = "h-8 w-8" }: IconProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[name];
    return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Sparkles className={className} />;
}

export default function CategoriesPage() {
    const { categories, tools } = toolsData;

    // Count tools per category
    const categoriesWithCounts = categories.map(category => ({
        ...category,
        toolCount: tools.filter(tool => tool.category === category.id).length
    }));

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">AI Tool Categories</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore our collection of 150+ AI tools organized by category.
                        Find exactly what you need for your projects.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoriesWithCounts.map((category) => (
                        <Link key={category.id} href={`/categories/${category.id}`}>
                            <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                                <CardHeader className="text-center pb-4">
                                    <div className="mx-auto p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit mb-4">
                                        <DynamicIcon name={category.icon} className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                        {category.name}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        {category.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center pt-0">
                                    <Badge variant="secondary" className="text-sm">
                                        {category.toolCount} tool{category.toolCount !== 1 ? "s" : ""}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-16 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div>
                            <div className="text-3xl font-bold text-primary mb-2">{categories.length}</div>
                            <div className="text-muted-foreground">Categories</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary mb-2">{tools.length}</div>
                            <div className="text-muted-foreground">Total Tools</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary mb-2">100%</div>
                            <div className="text-muted-foreground">Free</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}