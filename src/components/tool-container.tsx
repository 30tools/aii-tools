import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

interface ToolContainerProps {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
}

interface IconProps {
  name: string;
  className?: string;
}

function DynamicIcon({ name, className = "h-6 w-6" }: IconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Sparkles className={className} />;
}

export function ToolContainer({ title, description, icon, children }: ToolContainerProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Tool Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <DynamicIcon name={icon} className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Tool Content */}
        <div className="max-w-4xl mx-auto">
          {children}
        </div>

        {/* Related Tools */}
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold text-center mb-8">More AI Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/tools/writing/tweet-generator">Tweet Generator</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/tools/text/summarizer">Text Summarizer</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/tools/chat/chatgpt-chatbot">ChatGPT Bot</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/tools">View All Tools</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}