"use client";

import React, { useState } from "react";
import {
  MapPin,
  RefreshCw,
  Settings,
  Activity,
  Wifi,
  Radio,
  Image as ImageIcon,
  ExternalLink,
  Sliders,
} from "lucide-react";
import Link from "next/link";

interface TotemDevice {
  id: string;
  name: string;
  status: "online" | "offline";
  location: string;
  ip: string;
  firmware: string;
  lastSync: string;
  uptime: string;
  interactions: string;
  coords: { x: string; y: string };
}

const mockTotems: TotemDevice[] = [
  {
    id: "TTM-042",
    name: "Cavaleiros",
    status: "online",
    location: "Orla dos Cavaleiros, 1200",
    ip: "192.168.1.104",
    firmware: "v2.4.1",
    lastSync: "2 mins ago",
    uptime: "99.8%",
    interactions: "1,245",
    coords: { x: "52%", y: "48%" },
  },
  {
    id: "TTM-018",
    name: "Praça Veríssimo de Melo",
    status: "online",
    location: "Centro, Macaé",
    ip: "192.168.1.112",
    firmware: "v2.4.1",
    lastSync: "5 mins ago",
    uptime: "98.5%",
    interactions: "2,840",
    coords: { x: "42%", y: "65%" },
  },
  {
    id: "TTM-009",
    name: "Praia do Pecado",
    status: "offline",
    location: "Av. Atlântica, S/N",
    ip: "192.168.1.109",
    firmware: "v2.3.9",
    lastSync: "45 mins ago",
    uptime: "88.2%",
    interactions: "612",
    coords: { x: "65%", y: "58%" },
  },
];

export default function TotemsMapPage() {
  const [filter, setFilter] = useState<"all" | "online" | "offline">("all");
  const [selectedTotem, setSelectedTotem] = useState<TotemDevice>(mockTotems[0]);

  const filteredTotems = mockTotems.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const onlineCount = mockTotems.filter((t) => t.status === "online").length;
  const offlineCount = mockTotems.filter((t) => t.status === "offline").length;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Mapa de totens
          </h1>
          <p className="text-base text-slate-300 font-normal mt-1">
            Monitoramento de unidades ativas
          </p>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-4">
          <div className="bg-white text-slate-800 font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2.5 shadow-sm">
            <span className="w-3 h-3 rounded-full bg-[#00ff1e]" />
            <span>{onlineCount} Online</span>
          </div>

          <div className="bg-white text-slate-800 font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2.5 shadow-sm">
            <span className="w-3 h-3 rounded-full bg-[#b31b25]" />
            <span>{offlineCount} Offline</span>
          </div>
        </div>
      </div>

      {/* Main Map + Details Layout */}
      <div className="bg-[#021922] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
        {/* Card Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <span className="text-base font-bold text-white">Monitoramento</span>

          {/* Filter Pill Buttons */}
          <div className="flex items-center bg-[#08161b] p-1 rounded-lg border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-white text-[#08161b]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setFilter("online")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filter === "online"
                  ? "bg-white text-[#08161b]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Online
            </button>
            <button
              onClick={() => setFilter("offline")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filter === "offline"
                  ? "bg-white text-[#08161b]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Offline
            </button>
          </div>
        </div>

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 h-[620px]">
          {/* Map Area (Left) */}
          <div className="lg:col-span-8 relative bg-[#0a1f28] overflow-hidden flex items-center justify-center border-r border-white/10">
            {/* Dark Styled Map Grid Lines Background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Coastline / City Representation overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
              <div className="w-[85%] h-[85%] border border-dashed border-white/20 rounded-full" />
            </div>

            {/* Interactive Totem Pins on Map */}
            {filteredTotems.map((totem) => {
              const isSelected = selectedTotem.id === totem.id;
              const isOnline = totem.status === "online";

              return (
                <button
                  key={totem.id}
                  onClick={() => setSelectedTotem(totem)}
                  style={{ left: totem.coords.x, top: totem.coords.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                >
                  {/* Pin Dot */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all shadow-lg ${
                      isOnline
                        ? "bg-emerald-500 border-white text-white"
                        : "bg-red-500 border-white text-white"
                    } ${isSelected ? "scale-125 ring-4 ring-white/40" : "hover:scale-110"}`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Tooltip Label */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#08161b] text-white text-[11px] font-semibold px-2.5 py-1 rounded border border-white/20 shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {totem.name}
                  </div>
                </button>
              );
            })}

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-[#08161b] rounded-lg border border-white/20 overflow-hidden shadow-lg">
              <button className="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 transition-colors font-bold text-lg">
                +
              </button>
              <div className="h-px bg-white/10" />
              <button className="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 transition-colors font-bold text-lg">
                −
              </button>
            </div>
          </div>

          {/* Device Inspector Panel (Right) */}
          <div className="lg:col-span-4 bg-[#021922] p-6 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-5">
              {/* Selected Totem Header */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-white">
                    {selectedTotem.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selectedTotem.status === "online"
                          ? "bg-[#00ff1e]"
                          : "bg-[#b31b25]"
                      }`}
                    />
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      {selectedTotem.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      ID: {selectedTotem.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Totem Preview Card */}
              <div className="w-full h-36 bg-[#08161b] rounded-xl border border-white/10 overflow-hidden relative flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <ImageIcon className="w-8 h-8 opacity-40" />
                  <span className="text-xs font-medium">
                    Display Preview ({selectedTotem.location})
                  </span>
                </div>
              </div>

              {/* Activity & Interactions */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#08161b] border border-white/10 rounded-xl p-3.5 flex flex-col">
                  <span className="text-[11px] font-medium text-slate-400">
                    Atividade (30d)
                  </span>
                  <span className="text-xl font-bold text-white mt-1">
                    {selectedTotem.uptime}
                  </span>
                </div>

                <div className="bg-[#08161b] border border-white/10 rounded-xl p-3.5 flex flex-col">
                  <span className="text-[11px] font-medium text-slate-400">
                    Interações (24h)
                  </span>
                  <span className="text-xl font-bold text-white mt-1">
                    {selectedTotem.interactions}
                  </span>
                </div>
              </div>

              {/* Device Info section */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Device Info
                </span>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                  <span className="text-slate-400">IP Address</span>
                  <span className="font-mono text-white">{selectedTotem.ip}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Firmware</span>
                  <span className="font-mono text-white">
                    {selectedTotem.firmware}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5">
                  <span className="text-slate-400">Last Sync</span>
                  <span className="text-white">{selectedTotem.lastSync}</span>
                </div>
              </div>

              {/* Active Campaign section */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Active Campaign
                </span>

                <div className="bg-[#08161b] border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">
                      Summer Festival Promo
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Ends in 4 days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-6">
              <button
                onClick={() => alert(`Reinicando ${selectedTotem.name} remotamente...`)}
                className="flex-1 bg-white hover:bg-slate-100 text-[#08161b] font-semibold text-xs py-2.5 rounded-lg transition-all cursor-pointer"
              >
                Remote Restart
              </button>

              <Link
                href={`/totems/edit?id=${selectedTotem.id}`}
                className="bg-[#08161b] hover:bg-white/10 text-white p-2.5 rounded-lg border border-white/20 transition-all flex items-center justify-center"
                title="Editar configurações do totem"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
