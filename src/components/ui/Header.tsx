import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center bg-white dark:bg-[#121121] p-4 pb-2 justify-between sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
      <div className="text-[#0f172a] dark:text-gray-200 flex size-12 shrink-0 items-center justify-start -ml-2">
        <button className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <h1 className="text-[#0f172a] dark:text-gray-50 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
        AddressMap Pro
      </h1>
      <div className="size-12 shrink-0"></div> {/* Spacer para centralizar */}
    </header>
  );
}