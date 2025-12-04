"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateUniversalToolOutput } from "@/lib/actions/universal-tool-actions";

interface UniversalToolClientProps {
    toolId: string;
    toolTitle: string;
    toolDescription: string;
    toolCategory: string;
}

export function UniversalToolClient({
    toolId,
    toolTitle,
    toolDescription,
    toolCategory,
}: UniversalToolClientProps) {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!input.trim()) {
            toast.error("Please enter some input");
            return;
        }

        setIsLoading(true);
        try {
            const result = await generateUniversalToolOutput(
                toolId,
                toolTitle,
                toolDescription,
                toolCategory,
                input
            );

            if (result.success && result.result) {
                setOutput(result.result);
                toast.success("Generated successfully!");
            } else {
                toast.error(result.error || "Failed to generate");
            }
        } catch (err) {
            console.error('Generation error:', err);
            toast.error("An error occurred while generating");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async () => {
        if (!output) return;

        try {
            await navigator.clipboard.writeText(output);
            toast.success("Copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy");
        }
    };

    const getPlaceholder = () => {
        const placeholders: Record<string, string> = {
            writing: "Enter your text to transform...",
            creativity: "Describe your idea or topic...",
            text: "Paste your text here...",
            chat: "Start your conversation...",
            developer: "Enter your code or requirements...",
            learning: "Enter the topic or content to learn...",
            fun: "Enter something fun to analyze...",
            business: "Describe your business need...",
            design: "Describe what you want to create...",
            seo: "Enter your URL or content...",
            social: "Enter your content or topic...",
        };
        return placeholders[toolCategory] || "Enter your input here...";
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        Input
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder={getPlaceholder()}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={8}
                        className="resize-none"
                    />

                    <div className="flex gap-2">
                        <Button
                            onClick={handleGenerate}
                            disabled={isLoading || !input.trim()}
                            className="flex-1 sm:flex-initial"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Generate with AI
                                </>
                            )}
                        </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        ✨ Powered by advanced AI - 100% free, no signup required
                    </p>
                </CardContent>
            </Card>

            {/* Output Section */}
            {output && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Generated Result</CardTitle>
                            <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted p-4 rounded-lg border-l-4 border-purple-500">
                            <pre className="whitespace-pre-wrap font-sans text-sm">{output}</pre>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Quick Tips */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">💡 Quick Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>✓ Be specific and detailed in your input for best results</li>
                        <li>✓ You can generate multiple times to get different variations</li>
                        <li>✓ Edit the generated output to perfectly match your needs</li>
                        <li>✓ All generations are powered by advanced AI technology</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
