import { Header } from "@/components/ui/Header";
import { CepSearch } from "@/components/cep/CepSearch"; // Esse componente precisa ser Wrapper ou Client
import { ClientHome } from "@/components/ClientHome"; // <--- Vamos criar esse wrapper!
import { getHistory } from "@/actions/historyActions"; // Server Action

// A Home vira async para buscar dados no servidor
export default async function Home() {
  // Busca os dados direto no servidor (Server Side Rendering de verdade!)
  const history = await getHistory();

  // Passamos o history inicial para o componente cliente
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-sans transition-colors">
      <Header />
      <ClientHome initialHistory={history} />
    </div>
  );
}