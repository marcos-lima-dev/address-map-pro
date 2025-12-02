'use client'; 

import { Header } from "@/components/ui/Header";
import { CepSearch } from "@/components/cep/CepSearch";
import { AddressDetails } from "@/components/cep/AddressDetails";
import { useAddress } from "@/hooks/useAddress"; // <--- Importe o Hook
import dynamic from "next/dynamic";
import { useEffect } from "react";

// Lazy loading do mapa
const Map = dynamic(() => import("@/components/map/MapView"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl flex items-center justify-center">
      <span className="text-slate-400 font-medium">Carregando mapa...</span>
    </div>
  )
});

export default function Home() {
  // Chamamos o hook aqui. Ele nos dá tudo que precisamos.
  const { address, location, isLoading, error, fetchAddress } = useAddress();

  // Efeito inicial: Carregar o CEP de exemplo ao abrir a página
  useEffect(() => {
    fetchAddress("25070-210");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-sans transition-colors">
      <Header />
      
      <main className="flex-1 w-full max-w-5xl mx-auto">
        
        {/* Componente de Busca Conectado */}
        <CepSearch 
          initialCep="25070-210" 
          onSearch={(cep) => fetchAddress(cep)} 
          isLoading={isLoading}
        />

        {/* Feedback de Erro (Simples e funcional) */}
        {error && (
            <div className="px-4 mb-2">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Ops! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        )}

        {/* Mapa Recebendo as coordenadas dinâmicas do Hook */}
        <div className="flex px-4 py-3 h-[300px] md:h-[400px]">
           <Map lat={location.lat} lng={location.lng} />
        </div>

        {/* Detalhes do Endereço preenchidos pelo Hook */}
        <AddressDetails data={address} />
        
        <div className="px-4 py-3 mt-4 pb-10">
            <h3 className="text-base font-bold text-[#0f172a] dark:text-gray-200 mb-3 px-1">Últimas Buscas</h3>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-center text-gray-500">
                O histórico via Server Actions será a próxima etapa!
            </div>
        </div>

      </main>
    </div>
  );
}