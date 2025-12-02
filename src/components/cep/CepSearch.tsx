"use client"; // Importante: agora temos useState aqui dentro

import { Search, Loader2 } from "lucide-react"; // Importe o Loader2
import { useState } from "react";

interface CepSearchProps {
  initialCep?: string;
  onSearch: (cep: string) => void;
  isLoading?: boolean; // Nova prop para mostrar feedback visual
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
    <div className="px-4 py-3">
      <label className="flex flex-col min-w-40 h-12 w-full">
        <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-sm bg-[#e8e8f3] dark:bg-gray-700 transition-colors focus-within:ring-2 focus-within:ring-primary/50">
          
          {/* Botão de Busca (Lupa ou Loading) */}
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="text-[#545095] dark:text-gray-400 flex items-center justify-center pl-4 pr-2 hover:text-primary transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </button>

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#0f172a] dark:text-gray-50 focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-[#64748b] dark:placeholder:text-gray-400 px-2 text-base font-normal leading-normal"
            placeholder="Digite o CEP (ex: 25070210)"
          />
        </div>
      </label>
    </div>
  );
}