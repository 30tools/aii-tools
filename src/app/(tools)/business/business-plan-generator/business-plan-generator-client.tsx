"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, RefreshCw, FileText } from "lucide-react";
import { toast } from "sonner";
import { generateBusinessPlan } from "@/lib/actions/business-actions";

export function BusinessPlanGeneratorClient() {
  const [businessIdea, setBusinessIdea] = useState("");
  const [businessPlan, setBusinessPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!businessIdea.trim()) {
      toast.error("Please describe your business idea");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateBusinessPlan(businessIdea);
      if (result.success) {
        setBusinessPlan(result.result || "");
        toast.success("Business plan generated successfully!");
      } else {
        toast.error("Failed to generate business plan");
      }
    } catch (err) {
      console.error('Business plan generation error:', err);
      toast.error("An error occurred while generating the plan");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!businessPlan) return;
    
    try {
      await navigator.clipboard.writeText(businessPlan);
      toast.success("Business plan copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy business plan");
    }
 };

  const downloadPlan = () => {
    if (!businessPlan) return;
    
    const element = document.createElement("a");
    const file = new Blob([businessPlan], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "business-plan.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Business plan downloaded!");
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Describe Your Business Idea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your business idea, target market, and goals... (e.g., 'An eco-friendly online store selling sustainable products to environmentally conscious consumers')"
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
            rows={6}
            className="resize-none"
          />
          
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !businessIdea.trim()}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate Business Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      {businessPlan && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Generated Business Plan</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadPlan}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg border-l-4 border-blue-500 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans">{businessPlan}</pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Business Plan Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Business Plan Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Executive Summary</li>
            <li>• Company Description</li>
            <li>• Market Analysis</li>
            <li>• Organization & Management</li>
            <li>• Service or Product Line</li>
            <li>• Marketing & Sales Strategy</li>
            <li>• Funding Request</li>
            <li>• Financial Projections</li>
            <li>• Appendix</li>
          </ul>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Comprehensive plan structure</li>
            <li>• Financial projections included</li>
            <li>• Market analysis integration</li>
            <li>• Professional formatting</li>
            <li>• Downloadable format</li>
            <li>• Copy to clipboard option</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}