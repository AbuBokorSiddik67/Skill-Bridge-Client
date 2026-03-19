import { Footer } from "@/components/footer";
import { Navbar1 } from "@/components/navbar1";
import React from "react";

export default function RouteLayouts({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar1 />
      {children}
      <Footer />
    </div>
  );
}
