import React from "react";
import { SideNavBar } from "@/components/sidebar";
import { TopBar } from "@/components/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#08161b] text-white">
      <SideNavBar />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
