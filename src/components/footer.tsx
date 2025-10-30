import Link from "next/link";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">30</span>
              </div>
              <span className="font-bold text-xl">tools</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Discover 30+ free AI tools for writing, creativity, coding, and productivity. 
              All powered by ChatGPT with no signup required.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/30tools" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/30tools" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com/company/30tools" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/text/summarizer" className="text-muted-foreground hover:text-primary">
                  Text Summarizer
                </Link>
              </li>
              <li>
                <Link href="/tools/writing/ai-paraphraser" className="text-muted-foreground hover:text-primary">
                  AI Paraphraser
                </Link>
              </li>
              <li>
                <Link href="/tools/writing/tweet-generator" className="text-muted-foreground hover:text-primary">
                  Tweet Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/chat/chatgpt-chatbot" className="text-muted-foreground hover:text-primary">
                  ChatGPT Chatbot
                </Link>
              </li>
              <li>
                <Link href="/tools/creativity/startup-idea-generator" className="text-muted-foreground hover:text-primary">
                  Startup Idea Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-muted-foreground hover:text-primary">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 30tools. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Built with <Heart className="h-4 w-4 mx-1 text-red-500" /> by{" "}
            <Link href="https://shaswatraj.com" className="ml-1 hover:text-primary">
              Shaswat Raj
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}