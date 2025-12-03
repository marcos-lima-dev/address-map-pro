import { History, Trash2 } from "lucide-react";
import { HistoryItem, clearHistory } from "@/actions/historyActions";

interface HistoryListProps {
  items: HistoryItem[];
}

export function HistoryList({ items }: HistoryListProps) {
  if (items.length === 0) return null;

  return (
    <div className="px-4 py-3 mt-4 pb-8">
      <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Últimas Buscas</h3>
          <form action={clearHistory}>
            <button type="submit" className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium bg-red-50 px-2 py-1 rounded-md transition-colors">
                <Trash2 className="w-3 h-3" /> Limpar
            </button>
          </form>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          // AQUI: bg-white no item
          <div key={index} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
            <div className="text-slate-400 dark:text-slate-500">
              <History className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 font-mono">{item.cep}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[250px]">{item.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}