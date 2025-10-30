"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Rocket, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { generateStartupIdeas } from "@/lib/actions/creativity-actions";

export function StartupIdeaClient() {
  const [keyword, setKeyword] = useState("");
  const [ideaCount, setIdeaCount] = useState(5);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      toast.error("Please enter a keyword or industry");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateStartupIdeas(keyword, ideaCount);
      if (result.success && result.result) {
        setIdeas(result.result);
        toast.success("Startup ideas generated successfully!");
      } else {
        toast.error("Failed to generate startup ideas");
      }
    } catch (err) {
      console.error('Startup idea generation error:', err);
      toast.error("An error occurred while generating ideas");
    } finally {
      setIsLoading(false);
    }
  };

  const copyIdea = async (idea: string) => {
    try {
      await navigator.clipboard.writeText(idea);
      toast.success("Idea copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy idea");
    }
  };

  const sampleKeywords = ["AI", "FinTech", "HealthTech", "EdTech", "GreenTech", "FoodTech", "PropTech", "E-commerce"];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generate Startup Ideas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Keyword or Industry</label>
            <Input
              placeholder="Enter a keyword, industry, or technology (e.g., AI, Healthcare, Sustainability)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Number of Ideas</label>
            <Input
              type="number"
              min="3"
              max="10"
              value={ideaCount}
              onChange={(e) => setIdeaCount(Math.max(3, Math.min(10, parseInt(e.target.value) || 5)))}
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Try these popular keywords:</p>
            <div className="flex flex-wrap gap-2">
              {sampleKeywords.map((sample) => (
                <Badge
                  key={sample}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setKeyword(sample)}
                >
                  {sample}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !keyword.trim()}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                Generate Startup Ideas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Ideas */}
      {ideas.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Generated Startup Ideas
          </h3>
          {ideas.map((idea, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Idea #{index + 1}
                    </Badge>
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => copyIdea(idea)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{idea}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Startup Validation Framework */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Startup Validation Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-600">Problem Validation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Is this a real problem people face?</li>
                <li>• How big is the pain point?</li>
                <li>• Are people actively seeking solutions?</li>
                <li>• Can you reach the target audience?</li>
                <li>• Is the timing right for this solution?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-purple-600">Solution Validation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Can you build an MVP quickly?</li>
                <li>• Is the technology feasible?</li>
                <li>• What's your competitive advantage?</li>
                <li>• How will you monetize this?</li>
                <li>• Is this scalable long-term?</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Research Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Next Steps for Validation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">1. Customer Discovery</h4>
              <p className="text-sm text-muted-foreground">
                Interview 20-50 potential customers to validate the problem and understand their needs deeply.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">2. Market Research</h4>
              <p className="text-sm text-muted-foreground">
                Analyze market size, competition, trends, and existing solutions in the space.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600 mb-2">3. MVP Development</h4>
              <p className="text-sm text-muted-foreground">
                Build a minimum viable product to test your core hypothesis with real users.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-2">4. Go-to-Market Strategy</h4>
              <p className="text-sm text-muted-foreground">
                Plan how you'll acquire customers, pricing strategy, and key partnerships.
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
            <li>• AI-powered innovative business concepts</li>
            <li>• Market opportunity analysis included</li>
            <li>• Industry-specific idea generation</li>
            <li>• Feasibility considerations</li>
            <li>• Trend-aware suggestions</li>
            <li>• Validation framework guidance</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}