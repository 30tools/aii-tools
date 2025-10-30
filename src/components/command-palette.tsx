"use client";

import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import toolsData from "@/lib/tools.json";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search, Star, Clock, TrendingUp } from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
}

function DynamicIcon({ name, className = "h-4 w-4" }: IconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Sparkles className={className} />;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { tools, categories } = toolsData;

  // Get recent tools from localStorage
  const getRecentTools = () => {
    if (typeof window === "undefined") return [];
    const recent = localStorage.getItem("recentTools");
    return recent ? JSON.parse(recent) : [];
  };

  // Popular tools (you can customize this list)
  const popularToolIds = [
    "ai-paraphraser", "tweet-generator", "summarizer", "chatgpt-chatbot",
    "coding-assistant", "seo-meta-generator", "logo-maker", "password-generator"
  ];

  const popularTools = tools.filter(tool => popularToolIds.includes(tool.id));
  const recentToolIds = getRecentTools();
  const recentTools = tools.filter(tool => recentToolIds.includes(tool.id));

  // Filter tools based on search query
  const filteredTools = searchQuery.length > 0
    ? tools.filter(tool =>
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : [];

  // Group filtered tools by category
  const groupedTools = filteredTools.reduce((acc, tool) => {
    const category = categories.find(cat => cat.id === tool.category);
    if (category) {
      if (!acc[category.name]) {
        acc[category.name] = [];
      }
      acc[category.name].push(tool);
    }
    return acc;
  }, {} as Record<string, typeof tools>);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string, toolId: string) => {
    // Save to recent tools
    const recent = getRecentTools();
    const updatedRecent = [toolId, ...recent.filter((id: string) => id !== toolId)].slice(0, 5);
    localStorage.setItem("recentTools", JSON.stringify(updatedRecent));

    router.push(url);
    setOpen(false);
  };

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/categories/${categoryId}`);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Search tools (⌘K)"
        className="hidden md:flex items-center justify-between w-64 border rounded-lg px-3 py-2 text-sm bg-background hover:bg-accent transition-colors"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Search 150+ tools...</span>
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden w-9 h-9"
        aria-label="Open search"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search 150+ AI tools..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>
            <div className="text-center py-6">
              <Search className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No tools found</p>
              <p className="text-xs text-muted-foreground mt-1">Try searching for something else</p>
            </div>
          </CommandEmpty>

          {searchQuery.length === 0 && (
            <>
              {recentTools.length > 0 && (
                <CommandGroup heading="Recent">
                  {recentTools.slice(0, 3).map((tool) => (
                    <CommandItem
                      key={tool.id}
                      onSelect={() => handleSelect(tool.url, tool.id)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <DynamicIcon name={tool.icon} className="h-4 w-4" />
                        <div className="flex-1">
                          <div className="font-medium">{tool.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{tool.description}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {categories.find(cat => cat.id === tool.category)?.name}
                        </Badge>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              <CommandGroup heading="Popular">
                {popularTools.slice(0, 4).map((tool) => (
                  <CommandItem
                    key={tool.id}
                    onSelect={() => handleSelect(tool.url, tool.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <DynamicIcon name={tool.icon} className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="font-medium">{tool.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{tool.description}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {categories.find(cat => cat.id === tool.category)?.name}
                      </Badge>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Categories">
                {categories.slice(0, 6).map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => handleCategorySelect(category.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <DynamicIcon name={category.icon} className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground">{category.description}</div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {searchQuery.length > 0 && (
            <>
              {Object.entries(groupedTools).map(([categoryName, categoryTools]) => (
                <CommandGroup key={categoryName} heading={categoryName}>
                  {categoryTools.slice(0, 5).map((tool) => (
                    <CommandItem
                      key={tool.id}
                      onSelect={() => handleSelect(tool.url, tool.id)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <DynamicIcon name={tool.icon} className="h-4 w-4" />
                        <div className="flex-1">
                          <div className="font-medium">{tool.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{tool.description}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {categoryName}
                        </Badge>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
