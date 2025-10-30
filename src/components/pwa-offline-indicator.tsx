"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";

export function PWAOfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineToast, setShowOfflineToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (showOfflineToast) {
        toast.success("You're back online!", {
          icon: <Wifi className="h-4 w-4" />,
        });
        setShowOfflineToast(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineToast(true);
      toast.error("You're offline. Some features may not work.", {
        icon: <WifiOff className="h-4 w-4" />,
        duration: Infinity,
        action: {
          label: "Retry",
          onClick: () => {
            if (navigator.onLine) {
              window.location.reload();
            }
          },
        },
      });
    };

    // Set initial state
    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showOfflineToast]);

  // Show persistent offline indicator
  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm z-50">
        <div className="flex items-center justify-center gap-2">
          <WifiOff className="h-4 w-4" />
          <span>You're offline</span>
          <button
            onClick={() => window.location.reload()}
            className="ml-2 underline hover:no-underline"
          >
            <RefreshCw className="h-3 w-3 inline mr-1" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return null;
}