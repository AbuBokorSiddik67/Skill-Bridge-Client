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
  UsersIcon,
  Trash2Icon,
  Home,
} from "lucide-react";

const data = {
  user: {
    name: "Skill",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navAdmin: [
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
      title: "Inactive Users",
      url: "/dashboard/deleted-users",
      icon: <UsersIcon />,
    },
    {
      title: "Delete Users",
      url: "/dashboard/delete",
      icon: <Trash2Icon />,
    },
    {
      title: "Return Home",
      url: "/",
      icon: <Home />,
    },
  ],

  navStudent: [
    
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
      title: "Delete Users",
      url: "/dashboard/delete",
      icon: <Trash2Icon />,
    },
    {
      title: "Return Home",
      url: "/",
      icon: <Home />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMain items={data.navAdmin} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
