interface AddressData {
  logradouro: string;
  bairro: string;
  cidade: string;
}

export function AddressDetails({ data }: { data: AddressData }) {
  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 divide-y divide-[#e2e8f0] dark:divide-gray-700">
        
        <div className="grid grid-cols-[30%_1fr] gap-x-4 py-3">
          <p className="text-[#64748b] dark:text-gray-400 text-sm font-normal">Logradouro</p>
          <p className="text-[#0f172a] dark:text-gray-100 text-sm font-medium">{data.logradouro}</p>
        </div>

        <div className="grid grid-cols-[30%_1fr] gap-x-4 py-3">
          <p className="text-[#64748b] dark:text-gray-400 text-sm font-normal">Bairro</p>
          <p className="text-[#0f172a] dark:text-gray-100 text-sm font-medium">{data.bairro}</p>
        </div>

        <div className="grid grid-cols-[30%_1fr] gap-x-4 py-3">
          <p className="text-[#64748b] dark:text-gray-400 text-sm font-normal">Cidade</p>
          <p className="text-[#0f172a] dark:text-gray-100 text-sm font-medium">{data.cidade}</p>
        </div>

      </div>
      
      {/* Botão de Ação */}
      <div className="flex py-3 mt-4">
        <button className="flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#5048e5] text-[#f9f8fb] text-base font-bold tracking-[0.015em] hover:bg-[#5048e5]/90 transition-all">
          <span className="truncate">Confirmar Localização</span>
        </button>
      </div>
    </div>
  );
}