"use client";

import { Menu, Moon, Sun, X, Github, Linkedin, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado do Menu

  useEffect(() => setMounted(true), []);

  return (
    <>
      <header className="flex items-center bg-[var(--card-bg)] p-4 pb-2 justify-between sticky top-0 z-10 border-b border-[var(--border)] transition-colors duration-300 shadow-sm">
        
        {/* Botão Menu Hamburguer com Ação */}
        <div className="flex size-12 shrink-0 items-center justify-start -ml-2">
          <button 
            onClick={() => setIsMenuOpen(true)} // Abre o menu
            className="p-2 text-[var(--text-muted)] hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        <h1 className="text-[var(--foreground)] text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          AddressMap Pro
        </h1>
        
        {/* Toggle Theme (Seu código antigo continua aqui igual) */}
        <div className="flex shrink-0 items-center justify-end w-12">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
            </button>
          )}
        </div>
      </header>

      {/* --- SIDEBAR / DRAWER --- */}
      {/* 1. Backdrop Escuro (Clica fora pra fechar) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 2. O Menu em si */}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-[var(--card-bg)] z-50 shadow-2xl transition-transform duration-300 ease-out border-r border-[var(--border)] ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <span className="font-bold text-lg text-[var(--foreground)]">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <X className="w-5 h-5 text-[var(--text-muted)]" />
            </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Desenvolvedor</p>
            
            <a href="https://github.com/marcos-lima-dev" target="_blank" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--foreground)] transition-colors">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
            </a>
            
            <a href="https://www.linkedin.com/in/marcos-de-sousa-lima-1a6a6320" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--foreground)] transition-colors">
                <Linkedin className="w-5 h-5 text-blue-600" />
                <span>LinkedIn</span>
            </a>

            <div className="my-2 border-t border-[var(--border)]"></div>

            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Conta</p>
            
            <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--foreground)] w-full text-left transition-colors">
                <User className="w-5 h-5" />
                <span>Meu Perfil</span>
            </button>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-[var(--border)] text-center text-xs text-[var(--text-muted)]">
            v1.0.0 • AddressMap Pro
        </div>
      </div>
    </>
  );
}