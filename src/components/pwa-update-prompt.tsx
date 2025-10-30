"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Download } from "lucide-react";

export function PWAUpdatePrompt() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [showReload, setShowReload] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  setWaitingWorker(newWorker);
                  setShowReload(true);
                  
                  toast.info("New version available!", {
                    description: "Click to update to the latest version",
                    action: {
                      label: "Update",
                      onClick: () => updateApp(),
                    },
                    duration: Infinity,
                  });
                }
              });
            }
          });
        }
      });

      // Listen for controlling service worker change
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });
    }
  }, []);

  const updateApp = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      setShowReload(false);
      toast.success("Updating app...", {
        icon: <Download className="h-4 w-4" />,
      });
    }
  };

  return null;
}