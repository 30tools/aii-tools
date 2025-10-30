"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Flame, Smile } from "lucide-react";
import { toast } from "sonner";
import { roastBio } from "@/lib/actions/fun-actions";

export function RoastBioClient() {
  const [bio, setBio] = useState("");
  const [roast, setRoast] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoast = async () => {
    if (!bio.trim()) {
      toast.error("Please enter a bio to roast");
      return;
    }

    setIsLoading(true);
    try {
      const result = await roastBio(bio);
      if (result.success) {
        setRoast(result.result);
        toast.success("Bio roasted successfully! 🔥");
      } else {
        toast.error(result.error || "Failed to roast bio");
      }
    } catch (err) {
      console.error('Bio roasting error:', err);
      toast.error("An error occurred while roasting");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!roast) return;
    
    try {
      await navigator.clipboard.writeText(roast);
      toast.success("Roast copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy roast");
    }
  };

  const sampleBios = [
    "CEO of my own life 💪 Coffee addict ☕ Dog lover 🐕 Living my best life ✨",
    "Entrepreneur | Motivational Speaker | Changing the world one day at a time 🌍",
    "Just a small town girl living in a lonely world 🎵 Pizza is life 🍕",
    "Wanderlust ✈️ Adventure seeker 🏔️ Making memories around the globe 📸"
  ];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Enter Your Bio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your Instagram, Twitter, LinkedIn, or any social media bio here..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="resize-none"
          />

          <div>
            <p className="text-sm text-muted-foreground mb-2">Try these sample bios:</p>
            <div className="space-y-2">
              {sampleBios.map((sample, index) => (
                <div
                  key={index}
                  className="p-2 bg-muted rounded-lg text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => setBio(sample)}
                >
                  {sample}
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleRoast} 
            disabled={isLoading || !bio.trim()}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Roasting...
              </>
            ) : (
              <>
                <Flame className="w-4 h-4 mr-2" />
                Roast My Bio 🔥
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      {roast && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-500" />
                Your Bio Roast
              </CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Roast
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border-l-4 border-orange-500">
              <p className="whitespace-pre-wrap text-sm md:text-base">{roast}</p>
            </div>
            <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
              <Smile className="h-4 w-4" />
              Remember, this is all in good fun! Your bio is unique and that's what matters.
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">⚠️ Friendly Disclaimer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              This tool is designed for entertainment purposes only! Our AI provides light-hearted, 
              constructive humor about common bio clichés. We celebrate individuality and creativity 
              in all forms of self-expression. Your bio is a reflection of you, and that's beautiful! 
              Use this tool to have a laugh and maybe discover some fresh perspective on your online presence.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bio Writing Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bio Writing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Do's</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ Be authentic and genuine</li>
                <li>✅ Show your personality</li>
                <li>✅ Include your interests or profession</li>
                <li>✅ Use humor if it fits your style</li>
                <li>✅ Keep it concise and readable</li>
                <li>✅ Update it regularly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-red-600">Avoid</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>❌ Overused clichés and buzzwords</li>
                <li>❌ Too many emojis</li>
                <li>❌ Vague, meaningless phrases</li>
                <li>❌ Controversial or offensive content</li>
                <li>❌ Making it too long or complex</li>
                <li>❌ Copying others' styles exactly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform-Specific Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Platform-Specific Bio Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Instagram</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 150 character limit</li>
                <li>• Emojis are welcome</li>
                <li>• Include link in bio</li>
                <li>• Use line breaks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-sky-600">Twitter</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 160 character limit</li>
                <li>• Be witty and concise</li>
                <li>• Include profession/interests</li>
                <li>• Pin important tweets</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-800">LinkedIn</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Professional tone</li>
                <li>• Highlight expertise</li>
                <li>• Include achievements</li>
                <li>• Use keywords for discovery</li>
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
            <li>• Light-hearted, friendly humor</li>
            <li>• Constructive feedback on common clichés</li>
            <li>• Entertainment and self-reflection</li>
            <li>• Safe, family-friendly content</li>
            <li>• Positive ending with encouragement</li>
            <li>• Bio improvement insights</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}