"use client";

import React from "react";
import { User, Share2, LogOut, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export function TopBar() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("totem_session");
    }
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#08161b] shrink-0">
      {/* Left side empty or breadcrumb spacer */}
      <div className="flex items-center gap-2" />

      {/* Right controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => alert("Compartilhar link do painel copiado para a área de transferência!")}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Compartilhar</span>
        </button>

        <div className="h-4 w-px bg-white/10" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <User className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium text-slate-200">
            Administrador
          </span>
        </div>

        <button
          onClick={handleLogout}
          title="Sair do sistema"
          className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
