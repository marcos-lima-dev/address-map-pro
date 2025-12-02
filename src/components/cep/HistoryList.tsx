import { History, Trash2 } from "lucide-react";
import { HistoryItem, clearHistory } from "@/actions/historyActions";
// Importamos a action de limpar para usar num botão (client interaction)

interface HistoryListProps {
  items: HistoryItem[];
}

export function HistoryList({ items }: HistoryListProps) {
  if (items.length === 0) {
    return (
      <div className="px-4 py-8 mt-4 text-center">
         <p className="text-gray-400 text-sm">Nenhum histórico recente.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 mt-4 pb-8">
      <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-base font-bold text-[#0f172a] dark:text-gray-200">Últimas Buscas</h3>
          
          {/* Pequeno botão para limpar histórico - Server Action via form action ou onClick */}
          <form action={clearHistory}>
            <button type="submit" className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                <Trash2 className="w-3 h-3" /> Limpar
            </button>
          </form>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="text-[#64748b] dark:text-gray-400">
              <History className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#0f172a] dark:text-gray-100 font-mono">{item.cep}</p>
              <p className="text-xs text-[#64748b] dark:text-gray-400 truncate max-w-[250px]">{item.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}