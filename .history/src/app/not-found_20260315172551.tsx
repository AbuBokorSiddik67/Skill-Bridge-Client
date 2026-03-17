"use client";
import Link from "next/link";
import { MoveLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6">
        {/* Animated Icon/Circle */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
          <Search className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold tracking-tighter text-primary">
            404
          </h1>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-[400px] mx-auto">
            Sorry, we couldn't find the tutor or page you're looking for. It
            might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            variant="default"
            size="lg"
            className="rounded-full px-8"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8"
            onClick={() => window.history.back()}
          >
            <MoveLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>

      {/* Background Subtle Gradient */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
    </div>
  );
}
