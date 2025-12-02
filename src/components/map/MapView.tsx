"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

// Correção para o ícone padrão do Leaflet que quebra no Next.js
// Estamos criando um ícone "na mão" para não depender de imagens estáticas
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapViewProps {
  lat: number;
  lng: number;
}

// Sub-componente para controlar o zoom/movimento
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 15, { duration: 2 }); // Efeito de voo suave
  }, [lat, lng, map]);
  return null;
}

export default function MapView({ lat, lng }: MapViewProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative z-0">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full" // O Tailwind controla o tamanho
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={[lat, lng]} icon={icon} />
        
        {/* Esse componente invisível faz a mágica de mover a câmera */}
        <RecenterMap lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
}