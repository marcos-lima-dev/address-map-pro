"use client"; // Adicione isso para usar useState

import { useState } from "react";
import { CheckCircle2 } from "lucide-react"; // Ícone de sucesso

interface AddressData {
  logradouro: string;
  bairro: string;
  cidade: string;
}

export function AddressDetails({ data }: { data: AddressData }) {
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = () => {
    // Só confirma se tiver endereço
    if (!data.logradouro) return;

    setShowToast(true);
    // Esconde o toast depois de 3 segundos
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-4 relative"> {/* relative para o toast se posicionar */}
      
      {/* Container do Form */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 divide-y divide-slate-100 dark:divide-slate-700 border border-slate-100 dark:border-slate-700 transition-colors">
        <div className="grid grid-cols-[30%_1fr] gap-x-4 py-3">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Logradouro</p>
          <p className="text-slate-900 dark:text-slate-100 text-sm font-medium">{data.logradouro || "..."}</p>
        </div>
        <div className="grid grid-cols-[30%_1fr] gap-x-4 py-3">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Bairro</p>
          <p className="text-slate-900 dark:text-slate-100 text-sm font-medium">{data.bairro || "..."}</p>
        </div>
        <div className="grid grid-cols-[30%_1fr] gap-x-4 py-3">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Cidade</p>
          <p className="text-slate-900 dark:text-slate-100 text-sm font-medium">{data.cidade || "..."}</p>
        </div>
      </div>
      
      {/* Botão com Ação */}
      <div className="flex py-3 mt-4">
        <button 
          onClick={handleConfirm}
          disabled={!data.logradouro} // Desabilita se vazio
          className="flex w-full h-12 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white text-base font-bold hover:opacity-90 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar Localização
        </button>
      </div>

      {/* --- O TOAST DE SUCESSO --- */}
      {showToast && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 z-50">
          <CheckCircle2 className="w-6 h-6" />
          <div>
            <p className="font-bold text-sm">Sucesso!</p>
            <p className="text-xs text-green-100">Localização confirmada para entrega.</p>
          </div>
        </div>
      )}
    </div>
  );
}