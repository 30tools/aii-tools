"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Code2 } from "lucide-react";
import { toast } from "sonner";
import { explainCode } from "@/lib/actions/developer-actions";

export function CodeExplainerClient() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("auto");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { value: "auto", label: "Auto-detect" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "typescript", label: "TypeScript" },
    { value: "sql", label: "SQL" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
  ];

  const handleExplain = async () => {
    if (!code.trim()) {
      toast.error("Please enter code to explain");
      return;
    }

    setIsLoading(true);
    try {
      const result = await explainCode(code, language);
      if (result.success) {
        setExplanation(result.result);
        toast.success("Code explained successfully!");
      } else {
        toast.error(result.error || "Failed to explain code");
      }
    } catch (err) {
      console.error('Code explanation error:', err);
      toast.error("An error occurred while explaining code");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!explanation) return;
    
    try {
      await navigator.clipboard.writeText(explanation);
      toast.success("Explanation copied to clipboard!");
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Failed to copy explanation");
    }
  };

  const codeExamples = {
    javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    python: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    java: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`
  };

  const loadExample = (lang: string) => {
    setCode(codeExamples[lang as keyof typeof codeExamples] || "");
    setLanguage(lang);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Code to Explain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Programming Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="resize-none font-mono text-sm"
          />

          <div>
            <p className="text-sm text-muted-foreground mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(codeExamples).map((lang) => (
                <Button
                  key={lang}
                  variant="outline"
                  size="sm"
                  onClick={() => loadExample(lang)}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)} Example
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleExplain} 
            disabled={isLoading || !code.trim()}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Explaining...
              </>
            ) : (
              <>
                <Code2 className="w-4 h-4 mr-2" />
                Explain Code
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      {explanation && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Code Explanation</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Explanation
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{explanation}</p>
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
            <li>• Explains code in simple, understandable language</li>
            <li>• Supports 15+ programming languages</li>
            <li>• Line-by-line breakdown for complex code</li>
            <li>• Identifies programming concepts and patterns</li>
            <li>• Perfect for learning and code reviews</li>
            <li>• No technical jargon - beginner friendly</li>
          </ul>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tips for Better Explanations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Code Preparation</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Include complete functions/methods</li>
                <li>• Add relevant imports and dependencies</li>
                <li>• Specify the correct programming language</li>
                <li>• Keep code snippets focused and concise</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">Best Use Cases</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Understanding unfamiliar code</li>
                <li>• Learning new programming concepts</li>
                <li>• Code review documentation</li>
                <li>• Teaching and explaining to others</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}