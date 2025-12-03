"use client";

import { CepSearch } from "@/components/cep/CepSearch";
import { AddressDetails } from "@/components/cep/AddressDetails";
import { HistoryList } from "@/components/cep/HistoryList";
import { useAddress } from "@/hooks/useAddress";
import { HistoryItem } from "@/actions/historyActions";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // <--- 1. Importar o Hook de Roteamento

// Lazy loading do mapa
const Map = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl flex items-center justify-center">
      <span className="text-slate-400 font-medium">Carregando mapa...</span>
    </div>
  ),
});

export function ClientHome({ initialHistory }: { initialHistory: HistoryItem[] }) {
  const { address, location, isLoading, error, fetchAddress } = useAddress();
  const router = useRouter(); // <--- 2. Instanciar o router

  // Carrega o CEP padrão SOMENTE na primeira vez que entra na página
  useEffect(() => {
    fetchAddress("25070-210");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto p-4 space-y-4">
      
      {/* 1. Busca */}
      <CepSearch
        initialCep="25070-210"
        onSearch={async (cep) => {
          // <--- 3. A Lógica corrigida
          // Await garante que o endereço foi buscado e o cookie salvo ANTES de atualizar
          await fetchAddress(cep); 
          
          // O "Soft Refresh":
          // Vai no servidor buscar o novo histórico, mas NÃO reseta o estado da tela (Mapa/Inputs)
          router.refresh(); 
        }}
        isLoading={isLoading}
      />

      {/* Feedback de Erro */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          <strong className="font-bold">Ops! </strong>
          <span>{error}</span>
        </div>
      )}

      {/* 2. Mapa */}
      <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
        <Map lat={location.lat} lng={location.lng} />
      </div>

      {/* 3. Detalhes */}
      <AddressDetails data={address} />

      {/* 4. Histórico (Sempre atualizado pelo router.refresh) */}
      <HistoryList items={initialHistory} />
      
    </main>
  );
}