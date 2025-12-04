/**
 * Tool Page Generator Script
 * Generates complete tool pages with comprehensive SEO
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import tools from '../lib/tools.json';

const CATEGORIES_MAP: Record<string, string> = {
    writing: 'Writing & Content',
    creativity: 'Idea & Creativity',
    text: 'Text Utilities',
    chat: 'Chat & Conversation',
    developer: 'Developer Tools',
    learning: 'Learning & Study',
    fun: 'Fun & Viral',
    business: 'Business & Marketing',
    design: 'Design & Media',
    seo: 'SEO & Analytics',
    social: 'Social Media',
    health: 'Health & Wellness',
    finance: 'Finance & Investment',
    productivity: 'Productivity',
    utilities: 'Utilities',
};

function generateClientComponent(tool: any): string {
    return `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { generate${toPascalCase(tool.id)} } from "@/lib/actions/${tool.category}-actions";

export function ${toPascalCase(tool.id)}Client() {
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
      const result = await generate${toPascalCase(tool.id)}(input);
      if (result.success) {
        setOutput(result.result || "");
        toast.success("Generated successfully!");
      } else {
        toast.error("Failed to generate");
      }
    } catch (err) {
      console.error('Generation error:', err);
      toast.error("An error occurred");
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Input
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="${tool.description}"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="resize-none"
          />
          
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !input.trim()}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Result</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg border-l-4 border-purple-500">
              <pre className="whitespace-pre-wrap font-sans">{output}</pre>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            ${tool.features.map((f: string) => `<li>✓ ${f}</li>`).join('\n            ')}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}`;
}

function generatePageComponent(tool: any): string {
    const categoryName = CATEGORIES_MAP[tool.category] || tool.category;
    const keywords = tool.keywords.map((k: string) => `    '${k}',`).join('\n');
    const features = tool.features.map((f: string) => `    '${f}',`).join('\n');

    return `import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { ${toPascalCase(tool.id)}Client } from "./${tool.id}-client";
import { generateToolMetadata, generateToolSchema } from "@/lib/seo-utils";
import { getToolFAQs } from "@/lib/tool-faqs";

export const metadata: Metadata = generateToolMetadata({
  id: '${tool.id}',
  title: '${tool.title} - Free AI Tool Online',
  shortTitle: '${tool.title}',
  description: '${tool.description}. 100% free, no signup required.',
  category: '${categoryName}',
  url: '${tool.url}',
  keywords: [
${keywords}
  ],
  features: [
${features}
  ],
  rating: {
    value: 4.7,
    count: 850,
  },
});

const faqs = getToolFAQs('${tool.id}');
const howToSteps = [
  {
    name: 'Enter Your Input',
    text: 'Type or paste your content into the ${tool.title} input field.',
  },
  {
    name: 'Generate Result',
    text: 'Click the generate button to create your AI-powered result instantly.',
  },
  {
    name: 'Copy or Use',
    text: 'Copy the result to your clipboard or use it directly in your work.',
  },
];

const jsonLd = generateToolSchema(
  {
    id: '${tool.id}',
    title: '${tool.title}',
    description: '${tool.description}',
    category: '${tool.category}',
    url: '${tool.url}',
    keywords: metadata.keywords as string[],
    features: metadata.keywords as string[],
    rating: {
      value: 4.7,
      count: 850,
    },
  },
  faqs,
  howToSteps
);

export default function ${toPascalCase(tool.id)}Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="${tool.title}"
        description="${tool.description}"
        icon="${tool.icon}"
      >
        <${toPascalCase(tool.id)}Client />
        
        <div className="mt-8 space-y-6 prose prose-sm max-w-none dark:prose-invert">
          <section>
            <h2 className="text-2xl font-bold mb-4">${tool.title} - Free AI-Powered Tool</h2>
            <p>
              Use our free <strong>${tool.title.toLowerCase()}</strong> to ${tool.description.toLowerCase()}. 
              Powered by advanced AI technology, this tool delivers professional results instantly. 
              No signup required, completely free to use.
            </p>
          </section>

          ${faqs.length > 0 ? `<section>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="border rounded-lg p-4">
                  <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>` : ''}

          <div className="bg-muted rounded-lg p-6 text-center">
            <p className="text-lg font-semibold mb-2">
              Trusted by thousands of users worldwide
            </p>
            <p className="text-sm text-muted-foreground">
              Join professionals using our free AI tools to boost productivity
            </p>
          </div>
        </div>
      </ToolContainer>
    </>
  );
}`;
}

function toPascalCase(str: string): string {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1lower()))
        .join('');
}

function generateToolFiles(tool: any) {
    const toolPath = join(__dirname, '..', 'app', '(tools)', tool.category, tool.id);

    // Create directory if it doesn't exist
    if (!existsSync(toolPath)) {
        mkdirSync(toolPath, { recursive: true });
    }

    // Generate client component
    const clientPath = join(toolPath, `${tool.id}-client.tsx`);
    writeFileSync(clientPath, generateClientComponent(tool));

    // Generate page component
    const pagePath = join(toolPath, 'page.tsx');
    writeFileSync(pagePath, generatePageComponent(tool));

    console.log(`✓ Generated ${tool.id}`);
}

// Generate all tools
console.log('Generating tool pages...\n');
tools.tools.forEach(generateToolFiles);
console.log('\n✓ All tools generated!');
