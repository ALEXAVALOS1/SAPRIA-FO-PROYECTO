import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarLeft } from './SidebarLeft';

describe('SidebarLeft Component', () => {
  const defaultLayers = { activeFires: true, heatPoints: true, airQuality: false };
  const defaultHistory = { enabled: true, startDate: '2023-01-01', endDate: '2023-10-31' };
  const mockSetThermalHistory = jest.fn();
  const mockOnLayerChange = jest.fn();

  const renderSidebar = (props = {}) => {
    return render(<SidebarLeft 
      onTriggerAlert={jest.fn()} 
      layers={defaultLayers}
      onLayerChange={mockOnLayerChange}
      thermalHistory={defaultHistory}
      setThermalHistory={mockSetThermalHistory}
      userRole="admin"
      {...props}
    />);
  };

  test('renders sidebar with accessible region label', () => {
    renderSidebar();
    const aside = screen.getByLabelText('Controles del Mapa y Alertas');
    expect(aside).toBeInTheDocument();
    expect(aside.tagName).toBe('ASIDE');
  });

  test('renders critical alert section', () => {
    renderSidebar();
    expect(screen.getByText('Alerta Crítica')).toBeInTheDocument();
    expect(screen.getByText(/3 nuevos focos/i)).toBeInTheDocument();
  });

  test('calls onTriggerAlert when "Ver detalles" is clicked', () => {
    const handleTrigger = jest.fn();
    renderSidebar({ onTriggerAlert: handleTrigger });
    
    const button = screen.getByText('Ver detalles');
    fireEvent.click(button);
    
    expect(handleTrigger).toHaveBeenCalledTimes(1);
  });

  test('calls onLayerChange when checkboxes are clicked', () => {
    renderSidebar();
    
    const activeFireCheckbox = screen.getByLabelText(/Incendios Activos/i);
    expect(activeFireCheckbox).toBeChecked();
    
    fireEvent.click(activeFireCheckbox);
    expect(mockOnLayerChange).toHaveBeenCalledWith('activeFires');

    const airQualityCheckbox = screen.getByLabelText(/Calidad del Aire/i);
    expect(airQualityCheckbox).not.toBeChecked();
    
    fireEvent.click(airQualityCheckbox);
    expect(mockOnLayerChange).toHaveBeenCalledWith('airQuality');
  });

  test('calls setThermalHistory when history controls change', () => {
    renderSidebar();
    
    const heatLayerToggle = screen.getByLabelText(/Capa de Calor/i);
    expect(heatLayerToggle).toBeChecked();
    
    fireEvent.click(heatLayerToggle);
    expect(mockSetThermalHistory).toHaveBeenCalled();

    const startDateInput = screen.getByLabelText('Fecha de inicio');
    expect(startDateInput).toHaveValue('2023-01-01');
    
    fireEvent.change(startDateInput, { target: { value: '2024-02-02' } });
    expect(mockSetThermalHistory).toHaveBeenCalled();
  });

  test('hides thermal history for viewer role', () => {
    renderSidebar({ userRole: 'viewer' });
    expect(screen.queryByText('Historial Térmico')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Capa de Calor')).not.toBeInTheDocument();
  });
});