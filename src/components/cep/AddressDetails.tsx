interface AddressData {
  logradouro: string;
  bairro: string;
  cidade: string;
}

export function AddressDetails({ data }: { data: AddressData }) {
  return (
    <div className="p-4">
      {/* AQUI: bg-white forçado para Light Mode */}
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
      
      <div className="flex py-3 mt-4">
        <button className="flex w-full h-12 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white text-base font-bold hover:opacity-90 transition-all shadow-md active:scale-95">
          Confirmar Localização
        </button>
      </div>
    </div>
  );
}