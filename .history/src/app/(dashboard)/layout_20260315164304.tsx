import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
      <section>
        <TooltipProvider>{children}</TooltipProvider>
      </section>
    );
}
