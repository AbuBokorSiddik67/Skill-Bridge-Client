import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>

    </TooltipProvider>
    
  );
}
