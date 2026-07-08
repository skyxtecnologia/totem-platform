"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  X,
  CheckCircle2,
  Utensils,
  Calendar,
  Compass,
  Hotel,
  Film,
  PhoneCall,
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  category:
    | "Gastronomia"
    | "Eventos"
    | "Pontos Turísticos"
    | "Hotéis"
    | "Cinema & Filmes"
    | "Utilidade Pública";
  status: "active" | "draft";
  totems: string;
  location: string;
  updatedAt: string;
}

const initialItems: ContentItem[] = [
  {
    id: "CNT-101",
    title: "Festival de Frutos do Mar",
    category: "Eventos",
    status: "active",
    totems: "Todos os Totens",
    location: "Praia dos Cavaleiros",
    updatedAt: "Hoje, 09:12",
  },
  {
    id: "CNT-102",
    title: "Posto de Informações - Orla dos Cavaleiros",
    category: "Utilidade Pública",
    status: "active",
    totems: "T-04, T-09",
    location: "Orla dos Cavaleiros, 1200",
    updatedAt: "Ontem, 16:45",
  },
  {
    id: "CNT-103",
    title: "Restaurante Ilha do Sol",
    category: "Gastronomia",
    status: "active",
    totems: "Todos os Totens",
    location: "Rua das Lagostas, 45",
    updatedAt: "06/07/2026",
  },
  {
    id: "CNT-104",
    title: "Arquipélago de Santana",
    category: "Pontos Turísticos",
    status: "active",
    totems: "Todos os Totens",
    location: "Costa de Macaé",
    updatedAt: "05/07/2026",
  },
  {
    id: "CNT-105",
    title: "Hotel Palace Praia",
    category: "Hotéis",
    status: "active",
    totems: "T-04, T-01",
    location: "Av. Atlântica, 1950",
    updatedAt: "04/07/2026",
  },
  {
    id: "CNT-106",
    title: "Divertida Mente 2 - Sessões Cine Plaza",
    category: "Cinema & Filmes",
    status: "active",
    totems: "Todos os Totens",
    location: "Shopping Plaza Macaé",
    updatedAt: "03/07/2026",
  },
];

export default function ContentManagementPage() {
  const [items, setItems] = useState<ContentItem[]>(initialItems);
  const [filter, setFilter] = useState<string>("Todos");
  const [search, setSearch] = useState("");

  // Estado para o modal de Criação / Edição de conteúdo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalCategory, setModalCategory] = useState<ContentItem["category"]>("Gastronomia");
  const [modalLocation, setModalLocation] = useState("");
  const [modalStatus, setModalStatus] = useState<"active" | "draft">("active");

  const filteredItems = items.filter((item) => {
    const matchesFilter = filter === "Todos" || item.category === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    "Todos",
    "Gastronomia",
    "Pontos Turísticos",
    "Eventos",
    "Hotéis",
    "Cinema & Filmes",
    "Utilidade Pública",
  ];

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim()) return;

    const newItem: ContentItem = {
      id: `CNT-${Math.floor(100 + Math.random() * 900)}`,
      title: modalTitle,
      category: modalCategory,
      status: modalStatus,
      totems: "Todos os Totens",
      location: modalLocation || "Macaé, RJ",
      updatedAt: "Agora",
    };

    setItems([newItem, ...items]);
    setIsModalOpen(false);
    setModalTitle("");
    setModalLocation("");
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto relative">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Gerenciamento de Conteúdo
          </h1>
          <p className="text-base text-slate-300 font-normal mt-1">
            Controle todos os guias, eventos, filmes e utilidades exibidos no App Totem
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white hover:bg-slate-100 text-[#08161b] font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Novo Conteúdo</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-[#021922] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
        {/* Filter bar & search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-white/10 pb-5">
          {/* Category Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-white text-[#08161b] shadow-sm"
                    : "bg-[#08161b] text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por título ou local..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#08161b] text-white placeholder:text-slate-500 text-xs font-medium rounded-xl pl-10 pr-4 py-2.5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00ff1e]"
            />
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Conteúdo</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Endereço / Local</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Exibição nos Totens</th>
                <th className="py-3 px-4">Atualizado</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-4 font-semibold text-white">
                    {item.title}
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    <span className="bg-[#08161b] border border-white/10 px-3 py-1 rounded-lg text-xs font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-300">
                    {item.location}
                  </td>
                  <td className="py-4 px-4">
                    {item.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-[#00ff1e]" />
                        Ativo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        Rascunho
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-xs font-mono text-slate-300">
                    {item.totems}
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-400">
                    {item.updatedAt}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        title="Visualizar no app totem"
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        title="Editar"
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
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

      {/* Modal Novo Conteúdo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#021922] border border-white/20 rounded-2xl w-full max-w-md p-6 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                Cadastrar Novo Conteúdo
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Título / Nome do Local
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Restaurante Mar & Sol"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  className="w-full bg-[#08161b] text-white rounded-xl px-4 py-2.5 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00ff1e]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Categoria no App Totem
                </label>
                <select
                  value={modalCategory}
                  onChange={(e) =>
                    setModalCategory(
                      e.target.value as ContentItem["category"]
                    )
                  }
                  className="w-full bg-[#08161b] text-white rounded-xl px-4 py-2.5 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00ff1e]"
                >
                  <option value="Gastronomia">Gastronomia (Onde Comer)</option>
                  <option value="Pontos Turísticos">Pontos Turísticos</option>
                  <option value="Eventos">Eventos & Agenda Cultural</option>
                  <option value="Hotéis">Hotéis (Onde Ficar)</option>
                  <option value="Cinema & Filmes">Cinema & Filmes em Cartaz</option>
                  <option value="Utilidade Pública">Utilidade Pública</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Endereço / Localização
                </label>
                <input
                  type="text"
                  placeholder="Ex: Orla dos Cavaleiros, 800"
                  value={modalLocation}
                  onChange={(e) => setModalLocation(e.target.value)}
                  className="w-full bg-[#08161b] text-white rounded-xl px-4 py-2.5 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00ff1e]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Status Inicial
                </label>
                <select
                  value={modalStatus}
                  onChange={(e) =>
                    setModalStatus(e.target.value as "active" | "draft")
                  }
                  className="w-full bg-[#08161b] text-white rounded-xl px-4 py-2.5 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00ff1e]"
                >
                  <option value="active">Ativo e Exibindo imediatamente</option>
                  <option value="draft">Rascunho (Não exibir)</option>
                </select>
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
                  Salvar Conteúdo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
