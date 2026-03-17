"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    
  }, [error]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-8">
        <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-2xl flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground">
            An unexpected error occurred. Don't worry, our team has been
            notified.
          </p>
          {error.digest && (
            <div className="bg-muted p-2 rounded-md font-mono text-[10px] text-muted-foreground">
              Error ID: {error.digest}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            variant="default"
            className="w-full sm:w-auto"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="ghost" className="w-full sm:w-auto">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
