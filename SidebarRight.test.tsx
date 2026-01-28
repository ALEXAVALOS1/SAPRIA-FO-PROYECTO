import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SidebarRight } from './SidebarRight';

// Mock de los datos para tener un entorno controlado y predecible
jest.mock('./mockData', () => ({
  MOCK_EVENTS: [
    { id: 1, location: 'Sector Alpha', type: 'critical', title: 'Incendio A', description: 'Fuego activo', lat: 0, lng: 0, date: '2023-10-01' },
    { id: 2, location: 'Sector Beta', type: 'warning', title: 'Humo B', description: 'Columna de humo', lat: 0, lng: 0, date: '2023-10-02' },
    { id: 3, location: 'Sector Gamma', type: 'info', title: 'Controlado C', description: 'Falsa alarma', lat: 0, lng: 0, date: '2023-10-03' },
    { id: 4, location: 'Sector Delta', type: 'critical', title: 'Incendio D', description: 'Fuego en pastizal', lat: 0, lng: 0, date: '2023-10-04' },
    { id: 5, location: 'Sector Epsilon', type: 'warning', title: 'Humo E', description: 'Olor a quemado', lat: 0, lng: 0, date: '2023-10-05' },
    { id: 6, location: 'Sector Zeta', type: 'info', title: 'Mantenimiento F', description: 'Prueba de sensor', lat: 0, lng: 0, date: '2023-10-06' },
  ]
}));

describe('SidebarRight - Lógica de Filtrado y Paginación', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renderiza correctamente los eventos iniciales (Paginación por defecto)', () => {
    render(<SidebarRight isOpen={true} onClose={mockOnClose} />);
    
    // Deberían aparecer los primeros 5 eventos (Límite por página definido en el componente)
    expect(screen.getByText('Incendio A')).toBeInTheDocument();
    expect(screen.getByText('Humo E')).toBeInTheDocument();
    
    // El 6to evento no debería estar visible en la página 1
    expect(screen.queryByText('Mantenimiento F')).not.toBeInTheDocument();
  });

  test('Filtra eventos por título correctamente', () => {
    render(<SidebarRight isOpen={true} onClose={mockOnClose} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar en bitácora...');
    fireEvent.change(searchInput, { target: { value: 'Incendio' } });
    
    // Deberían aparecer Incendio A y Incendio D
    expect(screen.getByText('Incendio A')).toBeInTheDocument();
    expect(screen.getByText('Incendio D')).toBeInTheDocument();
    
    // No deberían aparecer otros tipos
    expect(screen.queryByText('Humo B')).not.toBeInTheDocument();
  });

  test('Filtra eventos por ubicación (Case Insensitive)', () => {
    render(<SidebarRight isOpen={true} onClose={mockOnClose} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar en bitácora...');
    // Buscamos "beta" en minúsculas, debe encontrar "Sector Beta"
    fireEvent.change(searchInput, { target: { value: 'beta' } });
    
    expect(screen.getByText('Humo B')).toBeInTheDocument();
    expect(screen.queryByText('Incendio A')).not.toBeInTheDocument();
  });

  test('Reinicia la paginación a la página 1 automáticamente al filtrar', () => {
    render(<SidebarRight isOpen={true} onClose={mockOnClose} />);
    
    // 1. Ir a la página 2 para ver el evento 6
    const nextButton = screen.getByLabelText('Página siguiente');
    fireEvent.click(nextButton);
    expect(screen.getByText('Mantenimiento F')).toBeInTheDocument();
    
    // 2. Aplicar filtro que coincida con un evento de la página 1 (ej. "Alpha")
    const searchInput = screen.getByPlaceholderText('Buscar en bitácora...');
    fireEvent.change(searchInput, { target: { value: 'Alpha' } });
    
    // 3. Verificar que volvimos a la página 1 y vemos el resultado
    expect(screen.getByText('Incendio A')).toBeInTheDocument(); // Sector Alpha
    expect(screen.getByText(/Página 1 de 1/)).toBeInTheDocument();
  });

  test('Muestra lista vacía si no hay coincidencias', () => {
    render(<SidebarRight isOpen={true} onClose={mockOnClose} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar en bitácora...');
    fireEvent.change(searchInput, { target: { value: 'TextoInexistenteXYZ' } });
    
    // Verificar que no hay eventos renderizados
    const eventCards = screen.queryAllByText(/Sector/);
    expect(eventCards).toHaveLength(0);
  });
});