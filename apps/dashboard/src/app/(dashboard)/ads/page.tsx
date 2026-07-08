"use client";

import React, { useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Calendar,
  MonitorSmartphone,
  Eye,
  Edit2,
  Trash2,
  TrendingUp,
  CheckCircle2,
  Clock,
  PlayCircle,
  X,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  advertiser: string;
  type: "Banner Interativo" | "Vídeo Fullscreen" | "Card Destaque";
  status: "active" | "scheduled" | "ended";
  totemsCount: number;
  impressions: string;
  clicks: string;
  endDate: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "CAMP-01",
    name: "Summer Festival Promo",
    advertiser: "Prefeitura de Macaé",
    type: "Banner Interativo",
    status: "active",
    totemsCount: 3,
    impressions: "14,820",
    clicks: "1,245",
    endDate: "Em 4 dias (12/07/2026)",
  },
  {
    id: "CAMP-02",
    name: "Festival Gastronômico Frutos do Mar",
    advertiser: "Polo Gastronômico Praia dos Cavaleiros",
    type: "Card Destaque",
    status: "active",
    totemsCount: 3,
    impressions: "9,430",
    clicks: "892",
    endDate: "Em 12 dias (20/07/2026)",
  },
  {
    id: "CAMP-03",
    name: "Campanha Conscientização Ambiental - Orla Limpa",
    advertiser: "Secretaria de Meio Ambiente",
    type: "Vídeo Fullscreen",
    status: "scheduled",
    totemsCount: 2,
    impressions: "0",
    clicks: "0",
    endDate: "Início em 15/07/2026",
  },
];

export default function AdsManagementPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAdvertiser, setNewAdvertiser] = useState("");

  const filtered = campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.advertiser.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCamp: Campaign = {
      id: `CAMP-0${campaigns.length + 1}`,
      name: newName,
      advertiser: newAdvertiser || "Parceiro Oficial",
      type: "Banner Interativo",
      status: "active",
      totemsCount: 3,
      impressions: "0",
      clicks: "0",
      endDate: "Vigente por 30 dias",
    };

    setCampaigns([newCamp, ...campaigns]);
    setIsModalOpen(false);
    setNewName("");
    setNewAdvertiser("");
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Anúncios & Campanhas Publicitárias
          </h1>
          <p className="text-base text-slate-300 font-normal mt-1">
            Gerencie banners, vídeos promocionais e métricas publicitárias nos terminais
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white hover:bg-slate-100 text-[#08161b] font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Nova Campanha</span>
        </button>
      </div>

      {/* KPI Overview Ads */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#021922] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Campanhas em Execução
          </span>
          <span className="text-3xl font-extrabold text-white mt-2">
            {campaigns.filter((c) => c.status === "active").length}
          </span>
          <span className="text-xs text-emerald-400 font-semibold mt-1">
            Exibição contínua em 3 terminais
          </span>
        </div>

        <div className="bg-[#021922] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Impressões Acumuladas (30d)
          </span>
          <span className="text-3xl font-extrabold text-white mt-2">
            24,250
          </span>
          <span className="text-xs text-emerald-400 font-semibold mt-1">
            ↑ +18.4% vs mês anterior
          </span>
        </div>

        <div className="bg-[#021922] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Cliques & Interações
          </span>
          <span className="text-3xl font-extrabold text-white mt-2">
            2,137
          </span>
          <span className="text-xs text-slate-300 font-medium mt-1">
            CTR médio de 8.8%
          </span>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#021922] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-base font-bold text-white">Listagem de Campanhas</h3>

          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar campanha..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#08161b] text-white placeholder:text-slate-500 text-xs font-medium rounded-xl pl-10 pr-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00ff1e]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Campanha</th>
                <th className="py-3 px-4">Anunciante</th>
                <th className="py-3 px-4">Formato</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Impressões</th>
                <th className="py-3 px-4">Cliques</th>
                <th className="py-3 px-4">Vigência</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 text-slate-300 text-xs">
                    {item.advertiser}
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-[#08161b] border border-white/10 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {item.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-[#00ff1e]" />
                        Ativa
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        Agendada
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-white">
                    {item.impressions}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-emerald-300">
                    {item.clicks}
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-400">
                    {item.endDate}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        title="Editar"
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setCampaigns(campaigns.filter((c) => c.id !== item.id))
                        }
                        title="Excluir"
                        className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nova Campanha */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#021922] border border-white/20 rounded-2xl w-full max-w-md p-6 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                Cadastrar Nova Campanha
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Nome da Campanha
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Promoção Festival de Inverno"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#08161b] text-white rounded-xl px-4 py-2.5 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00ff1e]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Anunciante / Órgão
                </label>
                <input
                  type="text"
                  placeholder="Ex: Secretaria de Turismo"
                  value={newAdvertiser}
                  onChange={(e) => setNewAdvertiser(e.target.value)}
                  className="w-full bg-[#08161b] text-white rounded-xl px-4 py-2.5 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00ff1e]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-white hover:bg-slate-100 text-[#08161b] font-semibold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Salvar Campanha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
