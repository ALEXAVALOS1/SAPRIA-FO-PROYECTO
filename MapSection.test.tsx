import React from 'react';
import { render, screen } from '@testing-library/react';
import { MapSection } from './MapSection';

// Mock de react-leaflet ya que requiere un entorno DOM con dimensiones reales
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children, className }: any) => <div data-testid="map-container" className={className}>{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children, alt }: any) => <div data-testid="map-marker" aria-label={alt} role="img">{children}</div>,
  Popup: ({ children }: any) => <div role="dialog">{children}</div>,
  useMap: () => ({
    getContainer: () => {
      // Simulamos el contenedor del mapa para probar MapAccessibility
      const div = document.createElement('div');
      div.setAttribute('id', 'leaflet-container-mock');
      document.body.appendChild(div);
      return div;
    }
  }),
}));

describe('MapSection Accessibility Validation', () => {
  const defaultProps = {
    layers: {
      activeFires: true,
      heatPoints: true,
      airQuality: false,
    },
    isRightSidebarOpen: false,
  };

  // Limpiar el DOM después de cada test para evitar duplicados generados por el mock
  afterEach(() => {
    const mockContainer = document.getElementById('leaflet-container-mock');
    if (mockContainer) mockContainer.remove();
    const instructions = document.getElementById('map-keyboard-instructions');
    if (instructions) instructions.remove();
  });

  test('renders map section with accessible region label', () => {
    render(<MapSection {...defaultProps} />);
    const section = screen.getByLabelText('Sección del Mapa Principal');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
  });

  test('injects accessibility attributes into map container via MapAccessibility', () => {
    render(<MapSection {...defaultProps} />);
    
    // Recuperamos el elemento creado por el mock de useMap
    const mapContainer = document.getElementById('leaflet-container-mock');
    
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveAttribute('role', 'region');
    expect(mapContainer).toHaveAttribute('aria-label', 'Mapa Interactivo de Monitoreo de Riesgos');
    
    // Verificar que las instrucciones de teclado se inyectaron correctamente
    const instructions = document.getElementById('map-keyboard-instructions');
    expect(instructions).toBeInTheDocument();
    expect(instructions).toHaveClass('sr-only');
  });

  test('markers have accessible labels (alt text)', () => {
    render(<MapSection {...defaultProps} />);
    const markers = screen.getAllByTestId('map-marker');
    
    // Verificar que el marcador de incendio tiene su etiqueta accesible
    const fireMarker = markers.find(m => m.getAttribute('aria-label') === 'Incendio Activo: Sector Riberas V');
    expect(fireMarker).toBeInTheDocument();
    expect(fireMarker).toHaveAttribute('role', 'img');
  });

  test('announces layer status changes to screen readers via aria-live region', () => {
    const { rerender } = render(<MapSection {...defaultProps} />);
    
    // Estado inicial
    const statusRegion = screen.getByRole('status');
    expect(statusRegion).toHaveClass('sr-only');
    expect(statusRegion).toHaveTextContent(/Capas visibles:.*Incendios Activos/);

    // Cambiar capas
    rerender(<MapSection {...defaultProps} layers={{ ...defaultProps.layers, activeFires: false, airQuality: true }} />);
    
    // Verificar actualización del texto
    expect(statusRegion).toHaveTextContent(/Capas visibles:.*Puntos de Calor, Calidad del Aire/);
    expect(statusRegion).not.toHaveTextContent('Incendios Activos');
  });
});