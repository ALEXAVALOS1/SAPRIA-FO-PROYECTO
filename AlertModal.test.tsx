import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AlertModal } from './AlertModal';

describe('AlertModal Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('does not render when isOpen is false', () => {
    render(<AlertModal isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByText(/¡ALERTA CRÍTICA DETECTADA!/i)).not.toBeInTheDocument();
  });

  test('renders correctly when isOpen is true', () => {
    render(<AlertModal isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText(/¡ALERTA CRÍTICA DETECTADA!/i)).toBeInTheDocument();
    expect(screen.getByText(/Riberas Del Bravo/i)).toBeInTheDocument();
    
    // Verify social buttons exist
    expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByText(/Facebook/i)).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<AlertModal isOpen={true} onClose={handleClose} />);
    
    const closeButton = screen.getByText('Cerrar');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when "Ver Mapa de Riesgo" is clicked', () => {
    const handleClose = jest.fn();
    render(<AlertModal isOpen={true} onClose={handleClose} />);
    
    const mapButton = screen.getByText(/Ver Mapa de Riesgo/i);
    fireEvent.click(mapButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking the backdrop', () => {
    const handleClose = jest.fn();
    render(<AlertModal isOpen={true} onClose={handleClose} />);
    
    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when Escape key is pressed', () => {
    const handleClose = jest.fn();
    render(<AlertModal isOpen={true} onClose={handleClose} />);
    
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('copies link to clipboard and shows toast message', async () => {
    // Mock clipboard API
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
      configurable: true,
    });

    render(<AlertModal isOpen={true} onClose={jest.fn()} />);
    
    const copyButton = screen.getByText(/Enlace/i);
    fireEvent.click(copyButton);
    
    // Esperar a que aparezca el toast después de que la promesa del portapapeles se resuelva
    await screen.findByText('Copiado');
    
    const alertText = `¡Alerta Crítica Detectada en Riberas Del Bravo! Más información en: ${window.location.href}`;
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(alertText);
    
    // Fast-forward time
    act(() => { jest.advanceTimersByTime(2000); });
    
    expect(screen.queryByText('Copiado')).not.toBeInTheDocument();
  });

  test('cleans up timer on unmount', () => {
    const { unmount } = render(<AlertModal isOpen={true} onClose={jest.fn()} />);
    
    const copyButton = screen.getByText(/Enlace/i);
    fireEvent.click(copyButton);
    
    // Unmount should clear the timeout and prevent state updates
    unmount();
    
    // Advance time to ensure no errors/warnings occur in console regarding unmounted updates
    act(() => {
      jest.advanceTimersByTime(2000);
    });
  });
});