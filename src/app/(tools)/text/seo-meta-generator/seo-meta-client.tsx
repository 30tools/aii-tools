"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Search, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { generateSEOMeta } from "@/lib/actions/text-actions";

export function SEOMetaClient() {
  const [content, setContent] = useState("");
  const [metaData, setMetaData] = useState<{ title: string; description: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!content.trim()) {
      toast.error("Please enter content to generate meta tags");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateSEOMeta(content);
      if (result.success) {
        setMetaData(result.result);
        toast.success("SEO meta tags generated successfully!");
      } else {
        toast.error(result.error || "Failed to generate meta tags");
      }
    } catch (err) {
      console.error('SEO meta generation error:', err);
      toast.error("An error occurred while generating meta tags");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy text");
    }
  };

  const getCharacterStatus = (text: string, min: number, max: number) => {
    const length = text.length;
    if (length < min) return { status: 'short', color: 'orange' };
    if (length > max) return { status: 'long', color: 'red' };
    return { status: 'good', color: 'green' };
  };

  const titleStatus = metaData ? getCharacterStatus(metaData.title, 30, 60) : null;
  const descriptionStatus = metaData ? getCharacterStatus(metaData.description, 120, 160) : null;

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content for SEO Meta Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your content, article, or webpage text to generate SEO-optimized title and meta description..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="resize-none"
          />
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{content.split(/\s+/).filter(word => word.length > 0).length} words</span>
            <span>{content.length} characters</span>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !content.trim()}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Generate SEO Meta Tags
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      {metaData && (
        <div className="space-y-4">
          {/* Title Tag */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">SEO Title Tag</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={titleStatus?.status === 'good' ? 'default' : 'secondary'}>
                    {metaData.title.length}/60 chars
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(metaData.title)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg mb-3">
                <p className="font-medium">{metaData.title}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {titleStatus?.status === 'good' ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    Optimal length
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                    {titleStatus?.status === 'short' ? 'Too short - consider adding more keywords' : 'Too long - may be truncated in search results'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Meta Description */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Meta Description</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={descriptionStatus?.status === 'good' ? 'default' : 'secondary'}>
                    {metaData.description.length}/160 chars
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(metaData.description)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg mb-3">
                <p>{metaData.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {descriptionStatus?.status === 'good' ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    Optimal length
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                    {descriptionStatus?.status === 'short' ? 'Too short - add more compelling details' : 'Too long - may be truncated in search results'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* HTML Code */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">HTML Meta Tags</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(`<title>${metaData.title}</title>\n<meta name="description" content="${metaData.description}">`)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy HTML
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <div>&lt;title&gt;{metaData.title}&lt;/title&gt;</div>
                <div>&lt;meta name=&quot;description&quot; content=&quot;{metaData.description}&quot;&gt;</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SEO Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SEO Meta Tag Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-600">Title Tag Guidelines</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep between 30-60 characters</li>
                <li>• Include primary keyword near the beginning</li>
                <li>• Make it compelling and click-worthy</li>
                <li>• Avoid keyword stuffing</li>
                <li>• Each page should have a unique title</li>
                <li>• Include brand name when beneficial</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-purple-600">Meta Description Tips</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Aim for 120-160 characters</li>
                <li>• Include target keywords naturally</li>
                <li>• Write compelling copy that encourages clicks</li>
                <li>• Accurately describe page content</li>
                <li>• Use active voice and call-to-action</li>
                <li>• Avoid duplicate descriptions</li>
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
            <li>• AI-optimized for search engines</li>
            <li>• Character count validation</li>
            <li>• Keyword integration</li>
            <li>• Click-worthy copy generation</li>
            <li>• HTML code output</li>
            <li>• SEO best practices compliance</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}