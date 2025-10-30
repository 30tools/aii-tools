"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, FileText } from "lucide-react";
import { toast } from "sonner";
import { summarizeText } from "@/lib/actions/text-actions";

export function SummarizerClient() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to summarize");
      return;
    }

    setIsLoading(true);
    try {
      const result = await summarizeText(inputText, length);
      if (result.success) {
        setSummary(result.result);
        toast.success("Text summarized successfully!");
      } else {
        toast.error(result.error || "Failed to summarize text");
      }
    } catch (err) {
      console.error('Summarization error:', err);
      toast.error("An error occurred while summarizing");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!summary) return;
    
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Summary copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy summary");
    }
  };

  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const getCompressionRatio = () => {
    if (!inputText || !summary) return 0;
    const originalWords = getWordCount(inputText);
    const summaryWords = getWordCount(summary);
    return originalWords > 0 ? Math.round(((originalWords - summaryWords) / originalWords) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Input Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste the text you want to summarize here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            className="resize-none"
          />
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{getWordCount(inputText)} words</span>
            <span>{inputText.length} characters</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Summary Length</label>
              <Select value={length} onValueChange={(value: 'short' | 'medium' | 'long') => setLength(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (1-2 sentences)</SelectItem>
                  <SelectItem value="medium">Medium (3-5 sentences)</SelectItem>
                  <SelectItem value="long">Long (1-2 paragraphs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleSummarize} 
                disabled={isLoading || !inputText.trim()}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Summarize Text
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {summary && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Summary</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {getCompressionRatio()}% shorter
                </Badge>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <p className="whitespace-pre-wrap">{summary}</p>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{getWordCount(summary)} words</span>
              <span>{summary.length} characters</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Multiple summary lengths (short, medium, long)</li>
            <li>• Accurate key point extraction</li>
            <li>• Word and character count tracking</li>
            <li>• Compression ratio calculation</li>
            <li>• Copy summary to clipboard</li>
            <li>• Maintains original meaning and context</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}