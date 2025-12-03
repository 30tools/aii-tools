"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RefreshCw, Image as ImageIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { generateImageUrl, generateImageVariations, IMAGE_SIZES } from "@/lib/pollinations";
import Image from "next/image";

export function LogoMakerClient() {
  const [description, setDescription] = useState("");
  const [logoUrls, setLogoUrls] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());

  const handleGenerate = () => {
    if (!description.trim()) {
      toast.error("Please describe the logo you want");
      return;
    }

    setIsGenerating(true);

    try {
      // Enhanced prompt for better logo generation
      const enhancedPrompt = `professional logo design: ${description.trim()}, vector style, clean, minimalist, high quality, white background`;

      // Generate 3 variations with different seeds
      const urls = generateImageVariations(enhancedPrompt, 3, {
        ...IMAGE_SIZES.LOGO,
        model: 'flux',
        nologo: true,
        enhance: true,
      });

      setLogoUrls(urls);
      setLoadingImages(new Set([0, 1, 2]));
      toast.success("Generating 3 logo variations...");
    } catch (err) {
      console.error('Logo generation error:', err);
      toast.error("Failed to generate logos");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageLoad = (index: number) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const downloadLogo = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `logo-variation-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      toast.success("Logo downloaded successfully!");
    } catch (err) {
      console.error('Download error:', err);
      toast.error("Failed to download logo");
    }
  };

  const regenerateVariation = (index: number) => {
    const enhancedPrompt = `professional logo design: ${description.trim()}, vector style, clean, minimalist, high quality, white background`;
    const newUrl = generateImageUrl(enhancedPrompt, {
      ...IMAGE_SIZES.LOGO,
      model: 'flux',
      nologo: true,
      enhance: true,
      seed: Date.now() + index,
    });

    const newUrls = [...logoUrls];
    newUrls[index] = newUrl;
    setLogoUrls(newUrls);

    setLoadingImages(prev => new Set(prev).add(index));
    toast.success(`Regenerating variation ${index + 1}...`);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Describe Your Logo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Example: 'Modern tech startup logo for CloudSync, blue and white colors, cloud symbol, minimalist geometric design'"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="resize-none"
          />

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !description.trim()}
              className="flex-1 sm:flex-initial"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Generate 3 Logo Variations
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            ✨ Powered by Pollinations AI - 100% free, no signup required
          </p>
        </CardContent>
      </Card>

      {/* Generated Logos */}
      {logoUrls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Logo Variations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {logoUrls.map((url, index) => (
                <div key={url} className="space-y-3">
                  <div className="relative aspect-square bg-muted rounded-lg overflow-hidden border-2 border-border">
                    {loadingImages.has(index) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    )}
                    <Image
                      src={url}
                      alt={`Logo variation ${index + 1}`}
                      fill
                      className="object-contain p-4"
                      onLoad={() => handleImageLoad(index)}
                      onError={() => {
                        handleImageLoad(index);
                        toast.error(`Failed to load variation ${index + 1}`);
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadLogo(url, index)}
                      className="flex-1"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => regenerateVariation(index)}
                      className="flex-1"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              ))}
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
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">Best Practices</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Keep it simple and memorable</li>
                <li>✓ Ensure it works in black and white</li>
                <li>✓ Make it scalable to any size</li>
                <li>✓ Reflect your brand values</li>
                <li>✓ Avoid trendy elements that may date quickly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600 mb-3">Color Psychology</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🔵 Blue: Trust, reliability, professionalism</li>
                <li>🔴 Red: Energy, excitement, urgency</li>
                <li>🟢 Green: Growth, health, nature</li>
                <li>⚫ Black: Luxury, sophistication, strength</li>
                <li>🟠 Orange: Creativity, friendliness, affordability</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Use */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to Use the AI Logo Maker</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                1
              </span>
              <div>
                <strong>Describe your logo:</strong> Include your brand name, industry, preferred colors, and style (modern, minimalist, vintage, etc.)
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                2
              </span>
              <div>
                <strong>Generate variations:</strong> Click the generate button to create 3 unique logo designs based on your description
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                3
              </span>
              <div>
                <strong>Refine and download:</strong> Regenerate individual variations or download your favorite as a PNG file
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}