"use client";

import React, { useEffect, useState } from "react";
import {
  MonitorSmartphone,
  AlertTriangle,
  UserPlus,
  ArrowUpRight,
  WifiOff,
  BatteryWarning,
  Wrench,
  TrendingUp,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";

interface DeviceStats {
  online: number;
  offline: number;
  total: number;
}

export default function DashboardHomePage() {
  const [stats, setStats] = useState<DeviceStats>({
    online: 3,
    offline: 0,
    total: 3,
  });

  // Busca estatísticas reais da nossa API se disponível
  useEffect(() => {
    async function fetchDevices() {
      try {
        const res = await fetch("http://localhost:8787/api/v1/device");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const onlineCount = data.filter((d: any) => d.status === "online").length;
            setStats({
              online: onlineCount,
              offline: data.length - onlineCount,
              total: data.length,
            });
          }
        }
      } catch (err) {
        // Fallback silencioso para dados de demonstração da plataforma
      }
    }
    fetchDevices();
  }, []);

  const weekData = [
    { day: "Seg", tourists: 380 },
    { day: "Ter", tourists: 540 },
    { day: "Qua", tourists: 460 },
    { day: "Qui", tourists: 720 },
    { day: "Sex", tourists: 980 },
    { day: "Sáb", tourists: 1000 },
    { day: "Dom", tourists: 890 },
  ];

  const maxTourists = 1000;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Observações gerais
          </h1>
          <p className="text-base text-slate-300 font-normal mt-1">
            Monitoramento de unidades ativas
          </p>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-4">
          <div className="bg-white text-slate-800 font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2.5 shadow-sm">
            <span className="w-3 h-3 rounded-full bg-[#00ff1e]" />
            <span>{stats.online} Online</span>
          </div>

          <div className="bg-white text-slate-800 font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2.5 shadow-sm">
            <span className="w-3 h-3 rounded-full bg-[#b31b25]" />
            <span>{stats.offline} Offline</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: TOTENS ONLINE */}
        <div className="bg-[#021922] border border-white/20 rounded-xl p-6 flex flex-col justify-between h-44 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
              TOTENS ONLINE
            </span>
            <MonitorSmartphone className="w-5 h-5 text-slate-400" />
          </div>

          <div className="text-4xl font-extrabold text-white tracking-tight">
            {stats.online} / {stats.total}
          </div>

          <div className="flex items-center">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded">
              ↑ 95.3% Uptime
            </span>
          </div>
        </div>

        {/* Card 2: ALERTAS ATIVOS */}
        <div className="bg-[#021922] border border-white/20 rounded-xl p-6 flex flex-col justify-between h-44 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
              ALERTAS ATIVOS
            </span>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>

          <div className="text-4xl font-extrabold text-white tracking-tight">
            0
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-red-500/20 text-red-300 text-xs font-semibold px-2.5 py-0.5 rounded">
              ! 0 Críticos
            </span>
            <span className="text-xs text-slate-400">0 em Manutenção</span>
          </div>
        </div>

        {/* Card 3: CADASTROS HOJE */}
        <div className="bg-[#021922] border border-white/20 rounded-xl p-6 flex flex-col justify-between h-44 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
              CADASTROS HOJE
            </span>
            <UserPlus className="w-5 h-5 text-slate-400" />
          </div>

          <div className="text-4xl font-extrabold text-white tracking-tight">
            342
          </div>

          <div className="flex items-center">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +12%
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Split: Chart + Alerts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Atividade Semanal de Turistas */}
        <div className="lg:col-span-7 bg-[#021922] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">
              Atividade Semanal de Turistas
            </h3>
            <button className="text-slate-400 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-64 flex items-end justify-between gap-4 px-2 pt-8 pb-2 border-b border-white/10">
            {weekData.map((item) => {
              const heightPercent = (item.tourists / maxTourists) * 100;
              return (
                <div
                  key={item.day}
                  className="flex-1 flex flex-col items-center gap-3 h-full justify-end group"
                >
                  <div className="text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    {item.tourists}
                  </div>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-white hover:bg-emerald-400 rounded-t transition-all duration-300"
                  />
                </div>
              );
            })}
          </div>

          {/* X Axis labels */}
          <div className="flex justify-between px-2 pt-3 text-xs font-medium text-slate-400">
            {weekData.map((item) => (
              <span key={item.day} className="flex-1 text-center">
                {item.day}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Alertas Recentes */}
        <div className="lg:col-span-5 bg-[#021922] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Alertas Recentes</h3>
            <a
              href="/totems"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Ver todos
            </a>
          </div>

          <div className="flex flex-col divide-y divide-white/5">
            {/* Alerta 1 */}
            <div className="py-3.5 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                  <WifiOff className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    Totem T-04 Offline
                  </span>
                  <span className="text-xs text-slate-400">
                    Praça Veríssimo de Melo - Perda de sinal detectada.
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                10 min
              </span>
            </div>

            {/* Alerta 2 */}
            <div className="py-3.5 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <BatteryWarning className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    Falha de Energia T-12
                  </span>
                  <span className="text-xs text-slate-400">
                    Praia do Pecado - Operando na bateria (20%).
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                45 min
              </span>
            </div>

            {/* Alerta 3 */}
            <div className="py-3.5 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    Manutenção Agendada T-08
                  </span>
                  <span className="text-xs text-slate-400">
                    Forte Marechal Hermes - Atualização de software.
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                2 horas
              </span>
            </div>

            {/* Alerta 4 */}
            <div className="py-3.5 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    T-04 Restaurado
                  </span>
                  <span className="text-xs text-slate-400">
                    Conexão restabelecida via 4G secundário.
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                Ontem
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
