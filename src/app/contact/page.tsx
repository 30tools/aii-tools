import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Github, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - 30tools | Get in Touch with Our Team",
  description: "Contact the 30tools team for support, feedback, or partnerships. We're here to help you make the most of our free AI tools platform.",
  keywords: ["contact 30tools", "support", "feedback", "AI tools help", "customer service"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or suggestions? We&apos;d love to hear from you! 
              Reach out to us through any of the channels below.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-blue-500" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For general inquiries, support, or feedback about our AI tools.
                </p>
                <div className="space-y-2">
                  <div>
                    <strong>General:</strong> hello@30tools.com
                  </div>
                  <div>
                    <strong>Support:</strong> support@30tools.com
                  </div>
                  <div>
                    <strong>Business:</strong> business@30tools.com
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-green-500" />
                  Community & Social
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Connect with us on social media for updates and community discussions.
                </p>
                <div className="space-y-3">
                  <a href="https://twitter.com/30tools" className="flex items-center gap-2 text-blue-500 hover:underline">
                    <Twitter className="h-4 w-4" />
                    @30tools
                  </a>
                  <a href="https://github.com/30tools" className="flex items-center gap-2 text-gray-600 hover:underline">
                    <Github className="h-4 w-4" />
                    GitHub Organization
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">How do I report a bug or issue?</h3>
                  <p className="text-muted-foreground">
                    Send us an email at support@30tools.com with details about the issue, 
                    including which tool you were using and what browser you&apos;re on.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Can I suggest new AI tools?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! We love hearing ideas for new tools. Email us at hello@30tools.com 
                    with your suggestions.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Is there an API available?</h3>
                  <p className="text-muted-foreground">
                    We&apos;re working on API access for developers. Join our mailing list or follow 
                    us on social media for updates.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">How can I partner with 30tools?</h3>
                  <p className="text-muted-foreground">
                    For partnership opportunities, integrations, or business inquiries, 
                    contact us at business@30tools.com.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card>
            <CardHeader>
              <CardTitle>Response Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">24h</div>
                  <div className="text-sm text-muted-foreground">General Inquiries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">12h</div>
                  <div className="text-sm text-muted-foreground">Bug Reports</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">48h</div>
                  <div className="text-sm text-muted-foreground">Business Inquiries</div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Response times are estimates and may vary during peak periods.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}