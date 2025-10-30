import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ToolsGrid } from "@/components/home/tools-grid";
import toolsData from "@/lib/tools.json";
import * as LucideIcons from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
}

function DynamicIcon({ name, className = "h-8 w-8" }: IconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Sparkles className={className} />;
}

interface Params {
  category: string;
}

export default function CategoryPage({ params }: { params: Params }) {
  const { category } = params;
  const categoryData = toolsData.categories.find(c => c.id === category);

  if (!categoryData) {
    notFound();
  }

  const categoryTools = toolsData.tools.filter(tool => tool.category === category);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <DynamicIcon name={categoryData.icon} className="h-8 w-8 text-primary" />
            </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryData.name}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {categoryData.description}
          </p>
        </div>
        <ToolsGrid />
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return toolsData.categories.map(category => ({
    category: category.id,
  }));
}