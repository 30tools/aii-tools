"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Twitter } from "lucide-react";
import { toast } from "sonner";
import { generateTweets } from "@/lib/actions/writing-actions";

export function TweetGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [tweetCount, setTweetCount] = useState(3);
  const [tweets, setTweets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateTweets(topic, tweetCount);
      if (result.success && result.result) {
        setTweets(result.result);
        toast.success("Tweets generated successfully!");
      } else {
        toast.error(result.error || "Failed to generate tweets");
      }
    } catch (err) {
      console.error('Tweet generation error:', err);
      toast.error("An error occurred while generating tweets");
    } finally {
      setIsLoading(false);
    }
  };

  const copyTweet = async (tweet: string) => {
    try {
      await navigator.clipboard.writeText(tweet);
      toast.success("Tweet copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy tweet");
    }
  };

  const getCharacterCount = (text: string) => text.length;
  const isOverLimit = (text: string) => text.length > 280;

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generate Tweets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Topic</label>
            <Textarea
              placeholder="Enter the topic you want to tweet about..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Number of Tweets</label>
              <Input
                type="number"
                min="1"
                max="5"
                value={tweetCount}
                onChange={(e) => setTweetCount(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !topic.trim()}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Twitter className="w-4 h-4 mr-2" />
                    Generate Tweets
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Tweets */}
      {tweets.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Generated Tweets</h3>
          {tweets.map((tweet, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Tweet {index + 1}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={isOverLimit(tweet) ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {getCharacterCount(tweet)}/280
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => copyTweet(tweet)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{tweet}</p>
                </div>
                {isOverLimit(tweet) && (
                  <p className="text-sm text-red-500 mt-2">
                    This tweet exceeds the 280 character limit. Consider shortening it.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Generate multiple tweet variations for any topic</li>
            <li>• Real-time character count tracking</li>
            <li>• Automatic hashtag suggestions</li>
            <li>• Copy tweets directly to clipboard</li>
            <li>• Optimized for engagement and virality</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}