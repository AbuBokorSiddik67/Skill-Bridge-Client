"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon } from "lucide-react"

const data = {
  user: {
    name: "Skill",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "All Users",
      url: "/dashboard/users",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "All Tutors",
      url: "/dashboard/tutors",
      icon: (
        <ListIcon
        />
      ),
    },
    {
      title: "All Bookings",
      url: "/dashboard/bookings",
      icon: (
        <ChartBarIcon
        />
      ),
    },
    {
      title: "Deleted Users",
      url: "/dashboard/deleted-users",
      icon: (
        <FolderIcon
        />
      ),
    },
    {
      title: "Delete Users",
      url: "/dashboard/delete",
      icon: (
        <UsersIcon
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard">
                <span className="text-base font-semibold">Skill Bridge Dashboard.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
