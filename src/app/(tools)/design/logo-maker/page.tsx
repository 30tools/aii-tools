import { Metadata } from "next";
import { ToolContainer } from "@/components/tool-container";
import { LogoMakerClient } from "./logo-maker-client";
import { generateToolMetadata, generateToolSchema, generateDefaultHowToSteps } from "@/lib/seo-utils";
import { getToolFAQs } from "@/lib/tool-faqs";

// SEO Metadata
export const metadata: Metadata = generateToolMetadata({
  id: 'logo-maker',
  title: 'AI Logo Maker - Free Logo Generator Online',
  shortTitle: 'AI Logo Maker - Free Logo Generator',
  description: 'Create professional logos instantly with our free AI logo maker. Generate unique logo designs from text descriptions. No design skills required.',
  category: 'Design & Media',
  url: '/design/logo-maker',
  keywords: [
    'ai logo maker',
    'free logo generator',
    'logo design ai',
    'create logo online free',
    'ai logo generator',
    'professional logo maker',
    'business logo creator',
    'brand identity design',
    'logo maker no signup',
    'instant logo generator',
  ],
  features: [
    'Generate 3 unique logo variations instantly',
    'Download high-resolution PNG logos',
    'No signup or credit card required',
    '100% free powered by Pollinations AI',
    'Professional vector-style designs',
    'Regenerate individual variations',
  ],
  rating: {
    value: 4.8,
    count: 1250,
  },
});

// JSON-LD Schema
const faqs = getToolFAQs('logo-maker');
const howToSteps = [
  {
    name: 'Describe Your Logo',
    text: 'Enter a detailed description including your brand name, industry, preferred colors, and style (modern, minimalist, vintage, etc.). For example: "Modern tech startup logo for CloudSync, blue and white colors, cloud symbol, minimalist geometric design"',
  },
  {
    name: 'Generate Logo Variations',
    text: 'Click the "Generate 3 Logo Variations" button. Our AI will create three unique logo designs based on your description in seconds.',
  },
  {
    name: 'Review and Refine',
    text: 'Browse the generated logo variations. If you want a different variation, click "Regenerate" on any individual logo to create a new version.',
  },
  {
    name: 'Download Your Logo',
    text: 'Click the "Download" button on your favorite logo variation to save it as a high-resolution PNG file ready for use.',
  },
];

const jsonLd = generateToolSchema(
  {
    id: 'logo-maker',
    title: 'AI Logo Maker',
    description: 'Free AI-powered logo generator that creates professional logo designs from text descriptions instantly.',
    category: 'design',
    url: '/design/logo-maker',
    keywords: metadata.keywords as string[],
    features: metadata.keywords as string[],
    rating: {
      value: 4.8,
      count: 1250,
    },
  },
  faqs,
  howToSteps
);

export default function LogoMakerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolContainer
        title="AI Logo Maker"
        description="Create professional logos instantly with AI-powered design generation"
        icon="Image"
      >
        <LogoMakerClient />

        {/* SEO Content */}
        <div className="mt-8 space-y-6 prose prose-sm max-w-none dark:prose-invert">
          <section>
            <h2 className="text-2xl font-bold mb-4">Create Professional Logos with AI in Seconds</h2>
            <p>
              Our <strong>AI logo maker</strong> transforms your brand vision into stunning, professional logo designs instantly.
              Powered by advanced Pollinations AI technology, this free logo generator creates unique, high-quality logos from simple text descriptions.
              Whether you're launching a startup, rebranding your business, or need a quick logo concept, our AI logo creator delivers professional results without requiring design skills or expensive software.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Choose Our AI Logo Generator?</h2>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">🎨 Professional Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Generate vector-style logos with clean, modern designs perfect for any brand or business.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">⚡ Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Create 3 unique logo variations in seconds. No waiting, no complex design process.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">💰 100% Free</h3>
                <p className="text-sm text-muted-foreground">
                  No hidden costs, no subscriptions, no credit card required. Unlimited logo generation.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">📥 Easy Download</h3>
                <p className="text-sm text-muted-foreground">
                  Download your logos as high-resolution PNG files ready for immediate use.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Perfect For</h2>
            <ul className="grid md:grid-cols-2 gap-2 list-none pl-0">
              <li>✓ Startups and new businesses</li>
              <li>✓ Small business rebranding</li>
              <li>✓ Social media branding</li>
              <li>✓ Personal brands and influencers</li>
              <li>✓ E-commerce stores</li>
              <li>✓ App and website logos</li>
              <li>✓ Event and project branding</li>
              <li>✓ Mock-ups and concept testing</li>
            </ul>
          </section>

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

          <section>
            <h2 className="text-2xl font-bold mb-4">Tips for Best Results</h2>
            <p>
              To get the most out of our AI logo generator:
            </p>
            <ul>
              <li><strong>Be specific:</strong> Include details like industry, colors, and style preferences</li>
              <li><strong>Mention symbols:</strong> If you want specific icons or shapes, describe them clearly</li>
              <li><strong>Try variations:</strong> Generate multiple times with slightly different descriptions</li>
              <li><strong>Consider scalability:</strong> Request simple, clear designs that work at any size</li>
            </ul>
          </section>

          <div className="bg-muted rounded-lg p-6 text-center">
            <p className="text-lg font-semibold mb-2">
              Trusted by over 50,000 businesses worldwide
            </p>
            <p className="text-sm text-muted-foreground">
              Join thousands of entrepreneurs and businesses using our free AI logo maker to create professional brand identities
            </p>
          </div>
        </div>
      </ToolContainer>
    </>
  );
}