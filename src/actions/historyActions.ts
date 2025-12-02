'use server';

import { cookies } from 'next/headers';

export interface HistoryItem {
  cep: string;
  address: string;
  date: string;
}

const COOKIE_NAME = 'address-map-history';

// Ação para LER o histórico (Roda no servidor)
export async function getHistory(): Promise<HistoryItem[]> {
  const cookieStore = await cookies();
  const historyCookie = cookieStore.get(COOKIE_NAME);

  if (!historyCookie) return [];

  try {
    return JSON.parse(historyCookie.value);
  } catch {
    return [];
  }
}

// Ação para SALVAR no histórico (Chamada pelo Client)
export async function addToHistory(item: Omit<HistoryItem, 'date'>) {
  const cookieStore = await cookies();
  const currentHistory = await getHistory();

  const newItem: HistoryItem = {
    ...item,
    date: new Date().toISOString(),
  };

  // Mantém apenas os últimos 5 itens e evita duplicados no topo
  const newHistory = [newItem, ...currentHistory.filter(h => h.cep !== item.cep)].slice(0, 5);

  cookieStore.set(COOKIE_NAME, JSON.stringify(newHistory), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
  
  // Opcional: Revalida o cache se estivéssemos usando fetch de dados cacheados
  // revalidatePath('/'); 
}

// Ação para LIMPAR (opcional, pra ficar chique)
export async function clearHistory() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}