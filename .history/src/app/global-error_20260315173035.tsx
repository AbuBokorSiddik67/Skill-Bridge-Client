"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-8 p-10 rounded-3xl border bg-card shadow-2xl">
            {/* Critical Error Icon */}
            <div className="mx-auto w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center animate-bounce">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tighter text-foreground">
                SYSTEM <span className="text-red-600">ERROR</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                A critical application error occurred. We are unable to load the
                root layout of SkillBridge.
              </p>
              {error.digest && (
                <code className="block p-2 bg-muted rounded text-[10px] text-red-500 font-mono">
                  Digest ID: {error.digest}
                </code>
              )}
            </div>

            <Button
              onClick={() => reset()}
              variant="destructive"
              className="w-full h-12 text-lg font-bold rounded-xl hover:scale-105 transition-transform"
            >
              <RefreshCcw className="mr-2 h-5 w-5" />
              Repair & Restart
            </Button>

            <p className="text-xs text-muted-foreground italic">
              SkillBridge Recovery System
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
