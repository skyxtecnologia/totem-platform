"use client";

import React, { useState } from "react";
import {
  Utensils,
  Hotel,
  Calendar,
  Bus,
  Compass,
  PhoneCall,
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  Save,
} from "lucide-react";
import Link from "next/link";

interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  overridden: boolean;
  icon: any;
}

export default function EditTotemPage() {
  const [selectedTotem, setSelectedTotem] = useState("T-04 Praia dos Cavaleiros");
  const [modules, setModules] = useState<ModuleConfig[]>([
    {
      id: "eat",
      name: "Onde Comer",
      description: "Guia de restaurantes e bares locais",
      enabled: true,
      overridden: true,
      icon: Utensils,
    },
    {
      id: "stay",
      name: "Onde Ficar",
      description: "Hotéis e pousadas parceiras",
      enabled: true,
      overridden: false,
      icon: Hotel,
    },
    {
      id: "events",
      name: "Agenda Cultural",
      description: "Eventos e shows na cidade",
      enabled: false,
      overridden: false,
      icon: Calendar,
    },
    {
      id: "transport",
      name: "Transporte",
      description: "Linhas de ônibus e horários em tempo real",
      enabled: true,
      overridden: false,
      icon: Bus,
    },
    {
      id: "attractions",
      name: "Pontos Turísticos",
      description: "Locais históricos e naturais próximos",
      enabled: true,
      overridden: false,
      icon: Compass,
    },
    {
      id: "public_services",
      name: "Utilidade Pública",
      description: "Contatos de emergência e serviços",
      enabled: true,
      overridden: false,
      icon: PhoneCall,
    },
  ]);

  const toggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return { ...m, enabled: !m.enabled, overridden: true };
        }
        return m;
      })
    );
  };

  const handleReset = () => {
    setModules((prev) =>
      prev.map((m) => ({ ...m, overridden: false, enabled: true }))
    );
  };

  const activeCount = modules.filter((m) => m.enabled).length;
  const overriddenCount = modules.filter((m) => m.overridden).length;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <Link
              href="/totems"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Edição dos Totems
            </h1>
          </div>
          <p className="text-base text-slate-300 font-normal mt-1">
            Edite as seções e conteúdos dos totems de forma geral ou individual
          </p>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-4">
          <div className="bg-white text-slate-800 font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2.5 shadow-sm">
            <span className="w-3 h-3 rounded-full bg-[#00ff1e]" />
            <span>2 Online</span>
          </div>
          <div className="bg-white text-slate-800 font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2.5 shadow-sm">
            <span className="w-3 h-3 rounded-full bg-[#b31b25]" />
            <span>1 Offline</span>
          </div>
        </div>
      </div>

      {/* Main Grid Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Totem Selector + Configuration Summary */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Seleção de Totem Card */}
          <div className="bg-[#021922] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
            <h3 className="text-base font-bold text-white">Seleção de Totem</h3>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-slate-400 font-medium">
                Totem Ativo
              </span>
              <select
                value={selectedTotem}
                onChange={(e) => setSelectedTotem(e.target.value)}
                className="w-full bg-[#08161b] text-white border border-white/20 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00ff1e]"
              >
                <option value="T-04 Praia dos Cavaleiros">
                  T-04 Praia dos Cavaleiros
                </option>
                <option value="T-01 Praça Veríssimo de Melo">
                  T-01 Praça Veríssimo de Melo
                </option>
                <option value="T-09 Praia do Pecado">T-09 Praia do Pecado</option>
              </select>
            </div>

            <div className="bg-[#08161b] border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff1e]" />
                <span className="text-xs font-semibold text-emerald-400">
                  Status: Online
                </span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">
                OPERACIONAL
              </span>
            </div>
          </div>

          {/* Resumo da Configuração Card */}
          <div className="bg-[#021922] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
            <h3 className="text-base font-bold text-white">
              Resumo da Configuração
            </h3>

            <div className="flex flex-col gap-3 divide-y divide-white/5">
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-300">Módulos Ativos</span>
                <span className="text-sm font-bold text-white font-mono">
                  {activeCount < 10 ? `0${activeCount}` : activeCount} / 12
                </span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xs text-slate-300">
                  Sobrescritas Ativas
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {overriddenCount < 10
                    ? `0${overriddenCount}`
                    : overriddenCount}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xs text-slate-300">Última Modificação</span>
                <span className="text-xs font-semibold text-white">
                  Hoje, 10:45
                </span>
              </div>
            </div>

            {/* Context Notice Banner */}
            <div className="bg-[#08161b] border border-white/10 rounded-xl p-4 mt-2">
              <p className="text-xs text-slate-300 leading-relaxed">
                Este totem está configurado para exibir conteúdo focado em{" "}
                <strong className="text-white">Gastronomia</strong> e{" "}
                <strong className="text-white">Lazer Noturno</strong> devido à
                sua localização na Praia dos Cavaleiros.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Módulos Disponíveis */}
        <div className="lg:col-span-7 bg-[#021922] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-white">
                  Módulos Disponíveis
                </h3>
                <span className="text-xs text-slate-400">
                  Arraste para reordenar ou use as chaves para ativar.
                </span>
              </div>

              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetar para Global</span>
              </button>
            </div>

            {/* List of Modules */}
            <div className="flex flex-col gap-3">
              {modules.map((mod) => {
                const Icon = mod.icon;

                return (
                  <div
                    key={mod.id}
                    className={`border rounded-xl p-4 flex items-center justify-between transition-all ${
                      mod.enabled
                        ? "bg-[#08161b] border-white/15"
                        : "bg-[#08161b]/50 border-white/5 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Drag handle icon or module icon */}
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">
                          {mod.name}
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5">
                          {mod.description}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {mod.overridden && (
                        <span className="bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                          SOBRESCRITO
                        </span>
                      )}

                      {/* Custom Modern Toggle Switch */}
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                          mod.enabled ? "bg-white" : "bg-white/20"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full transition-transform duration-200 ${
                            mod.enabled
                              ? "translate-x-5 bg-[#08161b]"
                              : "translate-x-0 bg-white"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Save bar */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10 mt-6">
            <button
              onClick={() => alert("Configurações salvas com sucesso no totem!")}
              className="bg-white hover:bg-slate-100 text-[#08161b] font-semibold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
