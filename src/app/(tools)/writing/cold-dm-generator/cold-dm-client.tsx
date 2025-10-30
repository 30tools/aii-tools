"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Send, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { generateColdDM } from "@/lib/actions/writing-actions";

export function ColdDMClient() {
  const [context, setContext] = useState("");
  const [platform, setPlatform] = useState<'twitter' | 'linkedin'>('linkedin');
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!context.trim()) {
      toast.error("Please provide context for your outreach");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateColdDM(context, platform);
      if (result.success) {
        setMessage(result.result);
        toast.success("Cold DM generated successfully!");
      } else {
        toast.error(result.error || "Failed to generate cold DM");
      }
    } catch (err) {
      console.error('Cold DM generation error:', err);
      toast.error("An error occurred while generating DM");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!message) return;
    
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Message copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy message");
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Outreach Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe the context of your outreach... (e.g., 'I want to connect with marketing professionals to discuss collaboration opportunities', 'Reaching out to potential clients for my web design services')"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={4}
            className="resize-none"
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Platform</label>
              <Select value={platform} onValueChange={(value: 'twitter' | 'linkedin') => setPlatform(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </div>
                  </SelectItem>
                  <SelectItem value="twitter">
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !context.trim()}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Generate DM
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {message && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                {platform === 'linkedin' ? <Linkedin className="h-5 w-5" /> : <Twitter className="h-5 w-5" />}
                Generated {platform === 'linkedin' ? 'LinkedIn' : 'Twitter'} DM
              </CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Message
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg border-l-4 ${platform === 'linkedin' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' : 'bg-sky-50 dark:bg-sky-900/20 border-sky-500'}`}>
              <p className="whitespace-pre-wrap">{message}</p>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>💡 Tip: Personalize this message with specific details about the recipient for better results!</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platform Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Platform Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-600">
                <Linkedin className="h-5 w-5" />
                LinkedIn DMs
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Professional and formal tone</li>
                <li>• Mention mutual connections or interests</li>
                <li>• Focus on business value</li>
                <li>• Keep messages under 150 words</li>
                <li>• Include clear call-to-action</li>
                <li>• Reference their recent posts or achievements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-sky-600">
                <Twitter className="h-5 w-5" />
                Twitter DMs
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Casual and conversational tone</li>
                <li>• Reference their tweets or content</li>
                <li>• Be brief and to the point</li>
                <li>• Use emojis appropriately</li>
                <li>• Mention shared interests or communities</li>
                <li>• Ask engaging questions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cold Outreach Success Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Do's</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✅ Research the recipient thoroughly</li>
                <li>✅ Personalize each message</li>
                <li>✅ Provide clear value proposition</li>
                <li>✅ Be genuine and authentic</li>
                <li>✅ Follow up appropriately</li>
                <li>✅ Keep it conversational</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-600">Don'ts</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>❌ Use generic templates</li>
                <li>❌ Be overly salesy</li>
                <li>❌ Send long paragraphs</li>
                <li>❌ Make it all about you</li>
                <li>❌ Be pushy or aggressive</li>
                <li>❌ Forget to proofread</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Platform-specific messaging optimization</li>
            <li>• Personalized and engaging content</li>
            <li>• Professional tone adjustment</li>
            <li>• Clear value proposition inclusion</li>
            <li>• Appropriate length for each platform</li>
            <li>• Soft call-to-action integration</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}