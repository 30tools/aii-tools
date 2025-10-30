"use client";

import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import toolsData from "@/lib/tools.json";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";

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
  const router = useRouter();
  const { tools } = toolsData;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    router.push(url);
    setOpen(false);
  };

  return (
    <>
      <div 
        className="hidden md:block border rounded-lg px-3 py-2 text-sm bg-background"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Search tools...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tools..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tools">
            {tools.map((tool) => (
              <CommandItem 
                key={tool.id} 
                onSelect={() => handleSelect(tool.url)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <DynamicIcon name={tool.icon} className="h-4 w-4" />
                  <div>
                    <div className="font-medium">{tool.title}</div>
                    <div className="text-xs text-muted-foreground">{tool.description}</div>
                  </div>
                </div>
                <div className="ml-auto flex gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {toolsData.categories.find(cat => cat.id === tool.category)?.name}
                  </Badge>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}