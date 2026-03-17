"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
} from "lucide-react";

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
      icon: <ListIcon />,
    },
    {
      title: "All Tutors",
      url: "/dashboard/tutors",
      icon: <ListIcon />,
    },
    {
      title: "All Bookings",
      url: "/dashboard/bookings",
      icon: <ListIcon />,
    },
    {
      title: "Deleted Users",
      url: "/dashboard/deleted-users",
      icon: <FolderIcon />,
    },
    {
      title: "Delete Users",
      url: "/dashboard/delete",
      icon: <User-,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
