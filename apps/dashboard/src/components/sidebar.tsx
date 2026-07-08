"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MonitorSmartphone,
  FileText,
  Megaphone,
  Users,
  Settings,
  MapPin,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Totems",
    href: "/totems",
    icon: MonitorSmartphone,
  },
  {
    name: "Conteúdo & CMS",
    href: "/content",
    icon: FileText,
  },
  {
    name: "Anúncios & Ads",
    href: "/ads",
    icon: Megaphone,
  },
  {
    name: "Usuários",
    href: "/users",
    icon: Users,
  },
  {
    name: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];

export function SideNavBar() {
  const pathname = usePathname();

  return (
    <aside className="w-[290px] bg-[#021922] border-r border-white/5 flex flex-col justify-between p-4 shrink-0 h-screen select-none">
      <div className="flex flex-col gap-6">
        {/* Logo Header */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#08161b]">
            <MapPin className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight leading-none">
              Macaé Smart Tour
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-[#08161b] font-semibold shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#08161b]" : "text-slate-400"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* System Status Banner at bottom */}
      <div className="mt-auto pt-4">
        <div className="bg-[#f1f1ec] text-[#2d2f2c] rounded-xl p-3.5 flex items-center gap-3 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00675c] shrink-0 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold leading-none">
              System Status: Active
            </span>
            <span className="text-[10px] text-slate-600 mt-0.5">
              All services operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
