"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import toolsData from "@/lib/tools.json";

interface IconProps {
  name: string;
  className?: string;
}

function DynamicIcon({ name, className = "h-6 w-6" }: IconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Sparkles className={className} />;
}

export function ToolsGrid() {
  const { categories, tools } = toolsData;

  return (
    <section id="tools" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our AI Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse through our collection of AI-powered tools organized by category. 
            Each tool is designed to boost your productivity and creativity.
          </p>
        </div>

        {/* Categories and Tools */}
        {categories.map((category) => {
          const categoryTools = tools.filter(tool => tool.category === category.id);
          
          return (
            <div key={category.id} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DynamicIcon name={category.icon} className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTools.map((tool) => (
                  <Card key={tool.id} className="hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <DynamicIcon name={tool.icon} className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{tool.title}</CardTitle>
                          </div>
                        </div>
                        <Badge 
                          variant={tool.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {tool.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild className="w-full">
                        <Link href={tool.url}>
                          Try {tool.title}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* View All Tools CTA */}
        <div className="text-center mt-16">
          <Button size="lg" variant="outline" asChild>
            <Link href="/tools">
              View All Tools
              <LucideIcons.ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}