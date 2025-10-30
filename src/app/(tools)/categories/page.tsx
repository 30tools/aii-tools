import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

export default function CategoriesPage() {
  const { categories, tools } = toolsData;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tool Categories</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover AI tools tailored to your needs. Browse by category to find the perfect solution for your tasks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryToolsCount = tools.filter(tool => tool.category === category.id).length;
            return (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <DynamicIcon name={category.icon} className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1">{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <div className="px-6 pb-4">
                      <p className="text-sm text-muted-foreground">{categoryToolsCount} tools</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}