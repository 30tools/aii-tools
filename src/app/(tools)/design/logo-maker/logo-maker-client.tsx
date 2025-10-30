"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Image } from "lucide-react";
import { toast } from "sonner";
import { generateLogo } from "@/lib/actions/design-actions";

export function LogoMakerClient() {
  const [description, setDescription] = useState("");
  const [logoText, setLogoText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please describe the logo you want");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateLogo(description);
      if (result.success) {
        setLogoText(result.result || "");
        toast.success("Logo concept generated successfully!");
      } else {
        toast.error("Failed to generate logo concept");
      }
    } catch (err) {
      console.error('Logo generation error:', err);
      toast.error("An error occurred while generating the logo");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!logoText) return;
    
    try {
      await navigator.clipboard.writeText(logoText);
      toast.success("Logo concept copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy logo concept");
    }
 };

  const downloadLogo = () => {
    if (!logoText) return;
    
    const element = document.createElement("a");
    const file = new Blob([logoText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "logo-concept.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Logo concept downloaded!");
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Describe Your Logo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your logo preferences... (e.g., 'A modern, minimalist tech company logo with blue and white colors, incorporating a geometric symbol representing connectivity')"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
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
                Generating Logo...
              </>
            ) : (
              <>
                <Image className="w-4 h-4 mr-2" />
                Generate Logo Concept
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      {logoText && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Generated Logo Concept</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadLogo}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg border-l-4 border-purple-500">
              <pre className="whitespace-pre-wrap font-sans">{logoText}</pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Logo Design Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Logo Design Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Keep it simple and memorable</li>
                <li>• Ensure it works in black and white</li>
                <li>• Make it scalable to any size</li>
                <li>• Reflect your brand values</li>
                <li>• Avoid trendy elements that may date quickly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600 mb-2">Color Psychology</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Blue: Trust, reliability, professionalism</li>
                <li>• Red: Energy, excitement, urgency</li>
                <li>• Green: Growth, health, nature</li>
                <li>• Black: Luxury, sophistication, strength</li>
                <li>• Orange: Creativity, friendliness, affordability</li>
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
            <li>• Custom logo concepts based on description</li>
            <li>• Style and color suggestions</li>
            <li>• Vector format recommendations</li>
            <li>• Brand alignment guidance</li>
            <li>• Download and copy options</li>
            <li>• Professional design tips</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}