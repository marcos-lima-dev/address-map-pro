"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    // Header usa 'bg-card' (Branco no light, Escuro no dark)
    // Isso fará ele se destacar do fundo cinza 'gelo' do body
    <header className="flex items-center bg-[var(--card-bg)] p-4 pb-2 justify-between sticky top-0 z-10 border-b border-[var(--border)] transition-colors duration-300 shadow-sm">
      
      {/* Menu */}
      <div className="flex size-12 shrink-0 items-center justify-start -ml-2">
        <button className="p-2 text-[var(--text-muted)] hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {/* Título */}
      <h1 className="text-[var(--foreground)] text-lg font-bold leading-tight tracking-tight flex-1 text-center">
        AddressMap Pro
      </h1>
      
      {/* Toggle em Cápsula */}
      <div className="flex shrink-0 items-center justify-end">
        {mounted ? (
          <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-full border border-gray-200 dark:border-slate-700">
            
            {/* Botão Light */}
            <button
              onClick={() => setTheme("light")}
              className={`p-1.5 rounded-full transition-all duration-300 ${
                theme === "light"
                  ? "bg-white text-primary shadow-sm scale-110" // Ativo: Branco + Sombra
                  : "text-gray-400 hover:text-gray-600"         // Inativo: Cinza
              }`}
              aria-label="Modo Claro"
            >
              <Sun className="w-4 h-4" />
            </button>

            {/* Botão Dark */}
            <button
              onClick={() => setTheme("dark")}
              className={`p-1.5 rounded-full transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-700 text-primary shadow-sm scale-110" // Ativo Dark
                  : "text-gray-400 hover:text-gray-300"
              }`}
              aria-label="Modo Escuro"
            >
              <Moon className="w-4 h-4" />
            </button>
            
          </div>
        ) : (
          <div className="w-[72px] h-[32px]" /> // Placeholder
        )}
      </div>

    </header>
  );
}