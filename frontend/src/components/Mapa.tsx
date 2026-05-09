import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Ponto } from "../types";

// Corrige ícone padrão do Leaflet que quebra com bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const BH_CENTER: L.LatLngExpression = [-19.9167, -43.9345];
const BH_ZOOM = 13;

interface Props {
  pontos: Ponto[];
  onDelete: (id: number) => void;
}

export default function Mapa({ pontos, onDelete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());

  // Inicializa o mapa uma única vez
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = L.map(containerRef.current).setView(BH_CENTER, BH_ZOOM);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(mapRef.current);
  }, []);

  // Sincroniza marcadores com a lista de pontos
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const currentIds = new Set(pontos.map((p) => p.id));

    // Remove marcadores de pontos deletados
    markersRef.current.forEach((marker, id) => {
      if (!currentIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Adiciona marcadores de pontos novos
    pontos.forEach((ponto) => {
      if (markersRef.current.has(ponto.id)) return;
      const marker = L.marker([ponto.latitude, ponto.longitude]).addTo(map);
      marker.bindPopup(
        `<div style="min-width:160px">
          <strong>${ponto.nome}</strong><br/>
          <small>${ponto.endereco}</small><br/>
          <small>${ponto.bairro}</small><br/>
          ${ponto.residuos.length ? `<em>${ponto.residuos.join(", ")}</em><br/>` : ""}
          <button
            onclick="window.__deletePonto(${ponto.id})"
            style="margin-top:8px;background:#e53e3e;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer"
          >Remover</button>
        </div>`
      );
      markersRef.current.set(ponto.id, marker);
    });
  }, [pontos]);

  // Expõe função de delete para o popup HTML
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__deletePonto = (id: number) => {
      onDelete(id);
    };
    return () => {
      delete (window as unknown as Record<string, unknown>).__deletePonto;
    };
  }, [onDelete]);

  return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
}
