"use server";

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
import { getUser } from "@/services/auth";

const data = {
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
      title: "My Bookings",
      url: "/dashboard/bookings",
      icon: <ListIcon />,
    },
    {
      title: "Delete Account",
      url: "/dashboard/delete",
      icon: <Trash2Icon />,
    },
    {
      title: "Return Home",
      url: "/",
      icon: <Home />,
    },
  ],

  navTutor: [
    {
      title: "My Bookings",
      url: "/dashboard/bookings",
      icon: <ListIcon />,
    },
    {
      title: "Delete Account",
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

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = await getUser();
  console.log(user)
  let content;
  if (user?.role === "ADMIN") {
    content = data.navAdmin;
  } else if (user?.role === "STUDENT") {
    content = data.navStudent;
  } else if (user?.role === "TUTOR") {
    content = data.navTutor;
  } else {
    content = <div>No Access</div>;
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMain items={data.navAdmin} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
