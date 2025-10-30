import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WifiOff, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline - 30tools",
  description: "You are currently offline. Some features may not be available.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
            <WifiOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">You're Offline</CardTitle>
          <CardDescription>
            It looks like you're not connected to the internet. Don't worry, you can still browse previously loaded content!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>📱 <strong>Available offline:</strong></p>
            <ul className="pl-4 space-y-1">
              <li>• Previously visited tool pages</li>
              <li>• Cached content and resources</li>
              <li>• Basic navigation</li>
            </ul>
            
            <p className="pt-2">🔄 <strong>Requires internet:</strong></p>
            <ul className="pl-4 space-y-1">
              <li>• AI tool processing</li>
              <li>• New content loading</li>
              <li>• Real-time features</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              className="flex-1"
              variant="default"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
          
          <div className="text-xs text-center text-muted-foreground">
            This page will automatically refresh when your connection is restored.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}