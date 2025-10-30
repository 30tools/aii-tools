import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolsGrid } from "@/components/home/tools-grid";
import * as LucideIcons from "lucide-react";
import toolsData from "@/lib/tools.json";

interface IconProps {
    name: string;
    className?: string;
}

function DynamicIcon({ name, className = "h-8 w-8" }: IconProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[name];
    return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Sparkles className={className} />;
}

interface CategoryPageProps {
    params: {
        category: string;
    };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const category = toolsData.categories.find(c => c.id === params.category);

    if (!category) {
        return {
            title: "Category Not Found | 30tools",
        };
    }

    const toolCount = toolsData.tools.filter(tool => tool.category === category.id).length;

    return {
        title: `${category.name} AI Tools | 30tools - Free AI Utilities`,
        description: `Discover ${toolCount} free ${category.name.toLowerCase()} AI tools. ${category.description} All tools are powered by ChatGPT and completely free to use.`,
    };
}

export async function generateStaticParams() {
    return toolsData.categories.map((category) => ({
        category: category.id,
    }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const category = toolsData.categories.find(c => c.id === params.category);

    if (!category) {
        notFound();
    }

    const categoryTools = toolsData.tools.filter(tool => tool.category === category.id);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-6">
                        <DynamicIcon name={category.icon} className="h-12 w-12 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                        {category.description}
                    </p>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                        {categoryTools.length} tool{categoryTools.length !== 1 ? "s" : ""} available
                    </div>
                </div>

                {/* Tools Grid */}
                <ToolsGrid category={params.category} />
            </div>
        </div>
    );
}