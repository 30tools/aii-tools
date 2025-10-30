"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { formatLinkedInPost } from "@/lib/actions/writing-actions";

export function LinkedInFormatterClient() {
  const [inputContent, setInputContent] = useState("");
  const [formattedPost, setFormattedPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormat = async () => {
    if (!inputContent.trim()) {
      toast.error("Please enter content to format");
      return;
    }

    setIsLoading(true);
    try {
      const result = await formatLinkedInPost(inputContent);
      if (result.success) {
        setFormattedPost(result.result || "");
        toast.success("LinkedIn post formatted successfully!");
      } else {
        toast.error("Failed to format LinkedIn post");
      }
    } catch (err) {
      console.error('LinkedIn formatting error:', err);
      toast.error("An error occurred while formatting");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!formattedPost) return;
    
    try {
      await navigator.clipboard.writeText(formattedPost);
      toast.success("LinkedIn post copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy post");
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content to Format</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your content that you want to transform into a professional LinkedIn post..."
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            rows={6}
            className="resize-none"
          />
          
          <Button 
            onClick={handleFormat} 
            disabled={isLoading || !inputContent.trim()}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Formatting...
              </>
            ) : (
              <>
                <Linkedin className="w-4 h-4 mr-2" />
                Format for LinkedIn
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      {formattedPost && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Formatted LinkedIn Post</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Post
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg border-l-4 border-blue-500">
              <p className="whitespace-pre-wrap">{formattedPost}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">LinkedIn Formatting Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Professional tone and structure optimization</li>
            <li>• Strategic emoji placement for engagement</li>
            <li>• Relevant professional hashtags</li>
            <li>• Proper spacing and readability</li>
            <li>• Call-to-action optimization</li>
            <li>• LinkedIn algorithm-friendly formatting</li>
          </ul>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">LinkedIn Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Start with a compelling hook in the first line</li>
            <li>• Use line breaks to improve readability</li>
            <li>• Include 3-5 relevant hashtags maximum</li>
            <li>• Ask questions to encourage engagement</li>
            <li>• Share personal insights and experiences</li>
            <li>• Keep posts between 150-300 words for best engagement</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}