import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { UniversalToolClient } from "@/components/universal-tool-client";
import { generateToolMetadata, generateToolSchema } from "@/lib/seo-utils";
import { getToolFAQs } from "@/lib/tool-faqs";
import toolsData from "@/lib/tools.json";

interface Params {
  category: string;
  tool: string;
}

const CATEGORY_NAMES: Record<string, string> = {
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
};

// Dynamic tool page that loads based on tools.json
export default async function DynamicToolPage({ params }: { params: Promise<Params> }) {
  const { category, tool } = await params;

  const toolData = toolsData.tools.find(t => t.id === tool);

  if (!toolData || toolData.category !== category) {
    notFound();
  }

  const faqs = getToolFAQs(toolData.id);
  const categoryName = CATEGORY_NAMES[toolData.category] || toolData.category;

  const howToSteps = [
    {
      name: 'Enter Your Input',
      text: `Type or paste your content into the ${toolData.title} input field.`,
    },
    {
      name: 'Generate with AI',
      text: 'Click the generate button to create your AI-powered result instantly.',
    },
    {
      name: 'Copy and Use',
      text: 'Copy the generated result to your clipboard and use it in your work.',
    },
  ];

  const jsonLd = generateToolSchema(
    {
      id: toolData.id,
      title: toolData.title,
      description: toolData.description,
      category: toolData.category,
      url: toolData.url,
      keywords: toolData.keywords,
      features: toolData.features,
      rating: {
        value: 4.7,
        count: 850,
      },
    },
    faqs,
    howToSteps
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title={toolData.title}
        description={toolData.description}
        icon={toolData.icon}
      >
        <UniversalToolClient
          toolId={toolData.id}
          toolTitle={toolData.title}
          toolDescription={toolData.description}
          toolCategory={toolData.category}
        />

        <div className="mt-8 space-y-6 prose prose-sm max-w-none dark:prose-invert">
          <section>
            <h2 className="text-2xl font-bold mb-4">{toolData.title} - Free AI Tool</h2>
            <p>
              Use our free <strong>{toolData.title.toLowerCase()}</strong> to {toolData.description.toLowerCase()}.
              Powered by advanced AI technology, this tool delivers professional results instantly.
              No signup required, completely free to use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-3 not-prose">
              {toolData.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {faqs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="border rounded-lg p-4">
                    <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                    <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="bg-muted rounded-lg p-6 text-center not-prose">
            <p className="text-lg font-semibold mb-2">
              Trusted by thousands of users worldwide
            </p>
            <p className="text-sm text-muted-foreground">
              Join professionals using our free AI {categoryName} tools to boost productivity
            </p>
          </div>
        </div>
      </ToolContainer>
    </>
  );
}

// Generate static params for all tools to ensure they're pre-built
export async function generateStaticParams() {
  return toolsData.tools.map(tool => ({
    category: tool.category,
    tool: tool.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tool } = await params;
  const toolData = toolsData.tools.find((t) => t.id === tool);
  if (!toolData) return {};

  const categoryName = CATEGORY_NAMES[toolData.category] || toolData.category;

  return generateToolMetadata({
    id: toolData.id,
    title: `${toolData.title} - Free AI Tool Online`,
    shortTitle: toolData.title,
    description: `${toolData.description}. 100% free, no signup required.`,
    category: categoryName,
    url: toolData.url,
    keywords: toolData.keywords,
    features: toolData.features,
    rating: {
      value: 4.7,
      count: 850,
    },
  });
}
