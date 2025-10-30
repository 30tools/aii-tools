"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as LucideIcons from "lucide-react";
import toolsData from "@/lib/tools.json";
import Link from "next/link";
import { Search, Filter, X } from "lucide-react";

interface IconProps {
    name: string;
    className?: string;
}

function DynamicIcon({ name, className = "h-5 w-5" }: IconProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[name];
    return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Sparkles className={className} />;
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [filteredTools, setFilteredTools] = useState(toolsData.tools);
    const [showFilters, setShowFilters] = useState(false);

    const { tools, categories } = toolsData;

    useEffect(() => {
        let filtered = tools;

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(tool =>
                tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(tool => tool.category === selectedCategory);
        }

        setFilteredTools(filtered);
    }, [searchQuery, selectedCategory, tools]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Update URL with search query
        const url = new URL(window.location.href);
        if (searchQuery.trim()) {
            url.searchParams.set("q", searchQuery);
        } else {
            url.searchParams.delete("q");
        }
        window.history.pushState({}, "", url.toString());
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        const url = new URL(window.location.href);
        url.searchParams.delete("q");
        window.history.pushState({}, "", url.toString());
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Search AI Tools</h1>
                    <p className="text-muted-foreground">
                        Find the perfect AI tool from our collection of 150+ utilities
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search tools, features, or keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button type="submit">Search</Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                </form>

                {/* Filters */}
                {showFilters && (
                    <div className="mb-6 p-4 border rounded-lg bg-muted/50">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Category:</label>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                <X className="h-4 w-4 mr-2" />
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                )}

                {/* Results */}
                <div className="mb-6">
                    <p className="text-sm text-muted-foreground">
                        {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} found
                        {searchQuery && ` for "${searchQuery}"`}
                    </p>
                </div>

                {/* Tools Grid */}
                {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTools.map((tool) => (
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
                                        <Badge variant="outline" className="text-xs">
                                            {categories.find(cat => cat.id === tool.category)?.name}
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-sm">
                                        {tool.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex flex-wrap gap-1 mb-4 h-12 overflow-hidden">
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
                ) : (
                    <div className="text-center py-12">
                        <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No tools found</h3>
                        <p className="text-muted-foreground mb-4">
                            Try adjusting your search terms or filters
                        </p>
                        <Button onClick={clearFilters}>Clear all filters</Button>
                    </div>
                )}
            </div>
        </div>
    );
}