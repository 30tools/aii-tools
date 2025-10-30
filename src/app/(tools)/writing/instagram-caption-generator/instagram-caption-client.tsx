"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Instagram } from "lucide-react";
import { toast } from "sonner";
import { generateInstagramCaption } from "@/lib/actions/writing-actions";

export function InstagramCaptionClient() {
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please describe your post");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateInstagramCaption(description);
      if (result.success) {
        setCaption(result.result || "");
        toast.success("Instagram caption generated successfully!");
      } else {
        toast.error("Failed to generate caption");
      }
    } catch (err) {
      console.error('Caption generation error:', err);
      toast.error("An error occurred while generating caption");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!caption) return;
    
    try {
      await navigator.clipboard.writeText(caption);
      toast.success("Caption copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy caption");
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
            placeholder="Describe what your Instagram post is about... (e.g., 'A sunset photo at the beach', 'My new workout routine', 'Delicious homemade pasta')"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="resize-none"
          />
          
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !description.trim()}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Instagram className="w-4 h-4 mr-2" />
                Generate Caption
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      {caption && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Generated Caption</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Caption
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border-l-4 border-pink-500">
              <p className="whitespace-pre-wrap">{caption}</p>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>💡 Tip: Copy this caption and paste it directly into your Instagram post!</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instagram Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Instagram Engagement Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">Caption Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Start with an engaging hook</li>
                <li>• Include a call-to-action</li>
                <li>• Use 3-5 relevant hashtags</li>
                <li>• Add emojis for personality</li>
                <li>• Keep it authentic and relatable</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-pink-600">Hashtag Strategy</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Mix popular and niche hashtags</li>
                <li>• Use location-based hashtags</li>
                <li>• Create a branded hashtag</li>
                <li>• Research trending hashtags</li>
                <li>• Don't overload with hashtags</li>
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
            <li>• AI-powered engaging caption creation</li>
            <li>• Relevant hashtag suggestions included</li>
            <li>• Emoji integration for personality</li>
            <li>• Call-to-action optimization</li>
            <li>• Instagram-friendly formatting</li>
            <li>• Works for any type of content</li>
          </ul>
        </CardContent>
      </Card>

      {/* Content Ideas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content Ideas to Try</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="p-2 bg-muted rounded text-center">🌅 Travel & Adventure</div>
            <div className="p-2 bg-muted rounded text-center">🍕 Food & Recipes</div>
            <div className="p-2 bg-muted rounded text-center">💪 Fitness & Health</div>
            <div className="p-2 bg-muted rounded text-center">📚 Learning & Growth</div>
            <div className="p-2 bg-muted rounded text-center">🎨 Art & Creativity</div>
            <div className="p-2 bg-muted rounded text-center">💼 Business & Career</div>
            <div className="p-2 bg-muted rounded text-center">🐾 Pets & Animals</div>
            <div className="p-2 bg-muted rounded text-center">🌱 Lifestyle & Wellness</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}