"use client";

import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

interface CepSearchProps {
  initialCep?: string;
  onSearch: (cep: string) => void;
  isLoading?: boolean;
}

export function CepSearch({ initialCep = "", onSearch, isLoading = false }: CepSearchProps) {
  const [inputValue, setInputValue] = useState(initialCep);

  const handleSearch = () => {
    if (inputValue) onSearch(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    // Container externo com bg-card (Branco no light)
    <div className="px-4 py-3 bg-[var(--card-bg)] shadow-sm mb-4 rounded-b-xl transition-colors duration-300">
      <label className="flex flex-col h-12 w-full">
        {/* O Input em si usa um cinza bem clarinho (slate-100) para destacar do fundo branco */}
        <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
          
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="text-slate-500 dark:text-slate-400 flex items-center justify-center pl-4 pr-2 hover:text-primary transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex w-full min-w-0 flex-1 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none px-2 text-base font-normal placeholder:text-slate-400"
            placeholder="Digite o CEP (ex: 25070-210)"
          />
        </div>
      </label>
    </div>
  );
}