"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Hash } from "lucide-react";
import { toast } from "sonner";
import { generateHashtags } from "@/lib/actions/social-actions";

export function HashtagGeneratorClient() {
  const [postDescription, setPostDescription] = useState("");
  const [platform, setPlatform] = useState<'instagram' | 'twitter' | 'linkedin' | 'tiktok'>('instagram');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!postDescription.trim()) {
      toast.error("Please describe your post");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateHashtags(postDescription, platform);
      if (result.success && result.result) {
        setHashtags(result.result);
        toast.success("Hashtags generated successfully!");
      } else {
        toast.error("Failed to generate hashtags");
      }
    } catch (err) {
      console.error('Hashtag generation error:', err);
      toast.error("An error occurred while generating hashtags");
    } finally {
      setIsLoading(false);
    }
  };

  const copyHashtags = async () => {
    if (hashtags.length === 0) return;
    
    try {
      await navigator.clipboard.writeText(hashtags.join(' '));
      toast.success("Hashtags copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy hashtags");
    }
 };

  const copyAll = async () => {
    if (hashtags.length === 0) return;
    
    try {
      await navigator.clipboard.writeText(postDescription + '\n\n' + hashtags.join(' '));
      toast.success("Post and hashtags copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy post and hashtags");
    }
 };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Describe Your Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your social media post... (e.g., 'A beautiful sunset at the beach with palm trees and calm waves')"
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            rows={4}
            className="resize-none"
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Platform</label>
              <Select value={platform} onValueChange={(value: 'instagram' | 'twitter' | 'linkedin' | 'tiktok') => setPlatform(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter/X</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !postDescription.trim()}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Hash className="w-4 h-4 mr-2" />
                    Generate Hashtags
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {hashtags.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Generated Hashtags</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyHashtags}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Hashtags
                </Button>
                <Button variant="outline" size="sm" onClick={copyAll}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border-l-4 border-pink-500">
              <div className="flex flex-wrap gap-2">
                {hashtags.map((hashtag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm border border-gray-200 dark:border-gray-700"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platform Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Platform Hashtag Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-purple-600 mb-2">Instagram</h4>
              <p className="text-sm text-muted-foreground">Up to 30 hashtags recommended. Mix popular and niche hashtags for best reach.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Twitter/X</h4>
              <p className="text-sm text-muted-foreground">1-2 hashtags recommended. Overuse can reduce engagement.</p>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-600 mb-2">LinkedIn</h4>
              <p className="text-sm text-muted-foreground">3-5 hashtags recommended. Use industry-specific tags for visibility.</p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-600 mb-2">TikTok</h4>
              <p className="text-sm text-muted-foreground">3-5 hashtags recommended. Include trending and niche tags for discovery.</p>
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
            <li>• Platform-specific hashtag recommendations</li>
            <li>• Mix of popular and niche hashtags</li>
            <li>• Engagement-optimized suggestions</li>
            <li>• Copy to clipboard functionality</li>
            <li>• Guidelines for each platform</li>
            <li>• Relevant to your content</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}