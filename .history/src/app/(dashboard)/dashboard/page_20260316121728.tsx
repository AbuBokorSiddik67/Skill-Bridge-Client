"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"


export default function Page() {
  return (
    <TooltipProvider>
      <div></div>
    </TooltipProvider>
  )
}
