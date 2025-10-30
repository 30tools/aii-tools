"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Mail } from "lucide-react";
import { toast } from "sonner";
import { rewriteEmail } from "@/lib/actions/writing-actions";

export function EmailRewriterClient() {
  const [emailContent, setEmailContent] = useState("");
  const [rewrittenEmail, setRewrittenEmail] = useState("");
  const [style, setStyle] = useState<'polite' | 'persuasive' | 'concise'>('polite');
  const [isLoading, setIsLoading] = useState(false);

  const handleRewrite = async () => {
    if (!emailContent.trim()) {
      toast.error("Please enter an email to rewrite");
      return;
    }

    setIsLoading(true);
    try {
      const result = await rewriteEmail(emailContent, style);
      if (result.success) {
        setRewrittenEmail(result.result);
        toast.success("Email rewritten successfully!");
      } else {
        toast.error(result.error || "Failed to rewrite email");
      }
    } catch (err) {
      console.error('Email rewriting error:', err);
      toast.error("An error occurred while rewriting");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!rewrittenEmail) return;
    
    try {
      await navigator.clipboard.writeText(rewrittenEmail);
      toast.success("Email copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy email");
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Original Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your email content here that you want to improve..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            rows={8}
            className="resize-none"
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Rewriting Style</label>
              <Select value={style} onValueChange={(value: 'polite' | 'persuasive' | 'concise') => setStyle(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="polite">More Polite</SelectItem>
                  <SelectItem value="persuasive">More Persuasive</SelectItem>
                  <SelectItem value="concise">More Concise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleRewrite} 
                disabled={isLoading || !emailContent.trim()}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Rewriting...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Rewrite Email
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {rewrittenEmail && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Rewritten Email ({style})</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Email
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg border-l-4 border-green-500">
              <p className="whitespace-pre-wrap">{rewrittenEmail}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Style Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rewriting Styles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-blue-600">More Polite</h4>
              <p className="text-sm text-muted-foreground">
                Adds courtesy, respect, and gentle language. Perfect for sensitive topics or formal communications.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600">More Persuasive</h4>
              <p className="text-sm text-muted-foreground">
                Enhances compelling language and convincing arguments. Great for sales, proposals, and requests.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600">More Concise</h4>
              <p className="text-sm text-muted-foreground">
                Removes unnecessary words while maintaining clarity. Ideal for busy recipients and quick communication.
              </p>
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
            <li>• Maintains original meaning and intent</li>
            <li>• Improves tone and professionalism</li>
            <li>• Enhances clarity and readability</li>
            <li>• Preserves email structure</li>
            <li>• Adapts to different communication styles</li>
            <li>• Perfect for business communication</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}