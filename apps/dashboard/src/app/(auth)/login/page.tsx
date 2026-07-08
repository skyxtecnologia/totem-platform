"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Lock, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Permite login de demonstração/acesso rápido para administradores do Macaé Smart Tour
    setTimeout(() => {
      setLoading(false);
      // Salva sessão no localStorage/cookie do painel administrativo
      if (typeof window !== "undefined") {
        localStorage.setItem("totem_session", "admin-authorized");
      }
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#08161b] flex flex-col items-center justify-between p-6 select-none">
      {/* Top spacer */}
      <div className="h-8" />

      {/* Main Login Card/Container */}
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo Macaé Smart Tour */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#08161b] shadow-lg">
            <MapPin className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold tracking-tight text-white leading-none">
              Macaé
            </span>
            <span className="text-lg font-light tracking-wide text-slate-300">
              Smart Tour
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center">
              <span className="bg-[#facc15] text-[#08161b] text-[11px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Login
              </span>
            </div>
            <input
              type="text"
              placeholder="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="w-full bg-white text-slate-900 placeholder:text-slate-400 font-medium text-sm rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00ff1e] transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <span className="text-xs font-medium text-slate-300">Senha</span>
            <input
              type="password"
              placeholder="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full bg-white text-slate-900 placeholder:text-slate-400 font-medium text-sm rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00ff1e] transition-all shadow-sm"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center font-medium mt-1">
              {error}
            </p>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-white hover:bg-slate-100 text-[#08161b] font-semibold text-sm px-10 py-2.5 rounded-md shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>

      {/* Footer disclaimer */}
      <div className="max-w-md text-center">
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Acesso restrito a usuários autorizados do programa Macaé Smart Tour. Ao utilizar o
          sistema, você concorda com nossa política de privacidade e uso de dados.
        </p>
        <div className="flex justify-center gap-4 mt-2 text-[10px] text-slate-500 font-medium">
          <a href="#" className="hover:text-slate-300 transition-colors">
            Política e privacidade
          </a>
          <span>•</span>
          <a href="#" className="hover:text-slate-300 transition-colors">
            Termos de serviço
          </a>
        </div>
      </div>
    </div>
  );
}
