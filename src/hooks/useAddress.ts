import { useState } from "react";
import { addToHistory } from "@/actions/historyActions"; // <--- Importando a Server Action

// Tipagem dos dados que nossa View precisa
interface AddressState {
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface LocationState {
  lat: number;
  lng: number;
}

export function useAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estado inicial (Dados vazios ou placeholder)
  const [address, setAddress] = useState<AddressState>({
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  // Estado inicial do mapa (Padrão: Centro do Brasil ou seu CEP)
  const [location, setLocation] = useState<LocationState>({
    lat: -22.7858, // Seu CEP inicial (Duque de Caxias)
    lng: -43.3066,
  });

  const fetchAddress = async (cep: string) => {
    // 1. Limpeza básica (remove traços e pontos para a URL)
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setError("O CEP deve conter 8 dígitos.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // --- PASSO 1: Buscar dados textuais no ViaCEP ---
      const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const viaCepData = await viaCepResponse.json();

      if (viaCepData.erro) {
        throw new Error("CEP não encontrado.");
      }

      // Atualiza os dados de texto na tela imediatamente
      setAddress({
        logradouro: viaCepData.logradouro,
        bairro: viaCepData.bairro,
        cidade: viaCepData.localidade,
        uf: viaCepData.uf,
      });

      // --- PASSO 1.5: SALVAR NO HISTÓRICO (SERVER ACTION) ---
      // Salvamos de forma assíncrona. Usamos viaCepData.cep para manter a formatação (ex: 25070-210)
      await addToHistory({
        cep: viaCepData.cep, 
        address: `${viaCepData.logradouro}, ${viaCepData.bairro} - ${viaCepData.localidade}/${viaCepData.uf}`
      });

      // --- PASSO 2: Buscar coordenadas no Nominatim (OpenStreetMap) ---
      // Montamos uma query de busca: "Rua X, Cidade - UF"
      // Isso é necessário porque o ViaCEP não dá latitude/longitude
      const query = `${viaCepData.logradouro}, ${viaCepData.localidade} - ${viaCepData.uf}, Brasil`;
      
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      const geoData = await geoResponse.json();

      if (geoData && geoData.length > 0) {
        // Achamos a coordenada exata!
        setLocation({
          lat: parseFloat(geoData[0].lat),
          lng: parseFloat(geoData[0].lon),
        });
      } else {
        // Fallback: Se não achar a rua, tenta buscar apenas a Cidade
        // (Melhor que não mostrar nada e travar o mapa)
        console.warn("Endereço exato não achado no mapa, buscando cidade...");
        const cityQuery = `${viaCepData.localidade} - ${viaCepData.uf}, Brasil`;
        const cityRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityQuery)}&limit=1`
        );
        const cityData = await cityRes.json();
        
        if (cityData && cityData.length > 0) {
            setLocation({
                lat: parseFloat(cityData[0].lat),
                lng: parseFloat(cityData[0].lon),
            });
        }
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido ao buscar CEP.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    address,
    location,
    isLoading,
    error,
    fetchAddress, 
  };
}