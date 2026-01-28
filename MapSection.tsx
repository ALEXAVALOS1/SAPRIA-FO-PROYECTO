import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LayersState } from './SidebarLeft';
import { MOCK_EVENTS } from './data/mockData';

// Corrección para iconos de Leaflet en React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapSectionProps {
  layers: LayersState;
  isRightSidebarOpen: boolean;
}

// Componente auxiliar para inyectar atributos de accesibilidad al contenedor del mapa
const MapAccessibility = () => {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    // Atributos ARIA esenciales para mapas interactivos
    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', 'Mapa Interactivo de Monitoreo de Riesgos');
    container.setAttribute('tabindex', '0');
    
    // Instrucciones de navegación para lectores de pantalla
    const instructionsId = 'map-keyboard-instructions';
    if (!document.getElementById(instructionsId)) {
      const instructions = document.createElement('div');
      instructions.id = instructionsId;
      instructions.className = 'sr-only'; // Oculto visualmente pero disponible para screen readers
      instructions.textContent = 'Utilice las teclas de flecha para desplazarse por el mapa. Use las teclas más y menos para hacer zoom.';
      container.appendChild(instructions);
      container.setAttribute('aria-describedby', instructionsId);
    }

    // Cleanup al desmontar para evitar duplicados
    return () => {
      const instructions = document.getElementById(instructionsId);
      if (instructions) instructions.remove();
    };
  }, [map]);

  return null;
};

export const MapSection: React.FC<MapSectionProps> = ({ layers, isRightSidebarOpen }) => {
  // Coordenadas base: Ciudad Juárez
  const center: [number, number] = [31.6904, -106.4245];

  const visibleEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      if (event.type === 'critical' && layers.activeFires) return true;
      if (event.type === 'warning' && layers.heatPoints) return true;
      if (event.type === 'info' && layers.airQuality) return true; // Mapeamos info a calidad del aire/otros
      return false;
    });
  }, [layers]);

  return (
    <section 
      className={`relative transition-all duration-300 ${isRightSidebarOpen ? 'col-span-12 lg:col-span-6' : 'col-span-12 lg:col-span-9'}`}
      aria-label="Sección del Mapa Principal"
    >
      <div className="h-[calc(100vh-10rem)] min-h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative z-10">
        <MapContainer 
          center={center} 
          zoom={12} 
          scrollWheelZoom={true} 
          className="h-full w-full outline-none focus:ring-2 focus:ring-primary"
          placeholder={<div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">Cargando mapa...</div>}
        >
          <MapAccessibility />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {visibleEvents.map(event => (
            <Marker 
              key={event.id} 
              position={[event.lat, event.lng]} 
              alt={`${event.title}: ${event.location}`} // location es string en mockData
              opacity={event.type === 'warning' ? 0.8 : 1}
            >
              <Popup>
                <div role={event.type === 'critical' ? "alert" : "status"} aria-live="polite">
                  <h3 className={`font-bold ${event.type === 'critical' ? 'text-red-600' : 'text-orange-500'}`}>
                    {event.title}
                  </h3>
                  <p className="font-medium">{event.location}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* Región en vivo para anunciar cambios de estado en las capas */}
      <div className="sr-only" role="status" aria-live="polite">
        {`Capas visibles: ${[
          layers.activeFires && 'Incendios Activos',
          layers.heatPoints && 'Puntos de Calor',
          layers.airQuality && 'Calidad del Aire'
        ].filter(Boolean).join(', ') || 'Ninguna'}`}
      </div>
    </section>
  );
};