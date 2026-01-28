import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  const originalAudioContext = window.AudioContext;
  afterEach(() => {
    window.AudioContext = originalAudioContext;
  });

  test('renders logo and title', () => {
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} />);
    expect(screen.getByText('SINAPRIA-FO')).toBeInTheDocument();
    expect(screen.getByText(/Monitoreo Municipal Juárez/i)).toBeInTheDocument();
    expect(screen.getByAltText('Logotipo del Escudo Nacional de México')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} />);
    expect(screen.getByText('Quiénes somos')).toBeInTheDocument();
    expect(screen.getByText('Quiénes somos')).toHaveAttribute('title', 'Conoce más sobre nosotros');
  });

  test('renders search button', () => {
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} />);
    expect(screen.getByLabelText('Abrir buscador')).toBeInTheDocument();
    expect(screen.getByText('search')).toBeInTheDocument();
    expect(screen.getByLabelText('Abrir buscador')).toHaveAttribute('title', 'Buscar en el sitio');
  });

  test('renders theme toggle button and calls toggleTheme', () => {
    const toggleTheme = jest.fn();
    render(<Header isDarkMode={false} toggleTheme={toggleTheme} />);
    
    const themeButton = screen.getByLabelText('Activar modo oscuro');
    expect(themeButton).toBeInTheDocument();
    expect(screen.getByText('dark_mode')).toBeInTheDocument();
    expect(themeButton).toHaveAttribute('title', 'Cambiar a modo oscuro');
    
    fireEvent.click(themeButton);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  test('renders light mode icon when isDarkMode is true', () => {
    render(<Header isDarkMode={true} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    expect(screen.getByLabelText('Activar modo claro')).toBeInTheDocument();
    expect(screen.getByText('light_mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Activar modo claro')).toHaveAttribute('title', 'Cambiar a modo claro');
  });

  test('renders notification indicator with default count', () => {
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    const notifButton = screen.getByLabelText(/3 no leídas/i);
    expect(notifButton).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('notifications')).toBeInTheDocument();
  });

  test('toggles notification dropdown when clicked', () => {
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    
    const notifButton = screen.getByTitle('Ver notificaciones');
    
    // Initially closed
    expect(screen.queryByText('Nuevos puntos de calor en Riberas')).not.toBeInTheDocument();
    
    // Open
    fireEvent.click(notifButton);
    expect(screen.getByText('Nuevos puntos de calor en Riberas')).toBeInTheDocument();
    expect(screen.getByText('Marcar leídas')).toBeInTheDocument();
  });

  test('marks all notifications as read', () => {
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    
    // Open dropdown
    fireEvent.click(screen.getByTitle('Ver notificaciones'));
    
    // Click mark as read
    fireEvent.click(screen.getByText('Marcar leídas'));
    
    // Badge should disappear (or count become 0)
    expect(screen.queryByText('3')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Sin notificaciones nuevas')).toBeInTheDocument();
  });

  test('removes individual notification when clicked', () => {
    jest.useFakeTimers();
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    
    // Open dropdown
    fireEvent.click(screen.getByTitle('Ver notificaciones'));
    
    // Click on a specific notification to delete it
    const notificationText = screen.getByText('Nuevos puntos de calor en Riberas');
    fireEvent.click(notificationText);
    
    // Advance timers to finish animation
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Verify it is removed
    expect(screen.queryByText('Nuevos puntos de calor en Riberas')).not.toBeInTheDocument();
    // Count should decrease from 3 to 2
    expect(screen.getByText('2')).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  test('undoes notification deletion', () => {
    jest.useFakeTimers();
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    
    fireEvent.click(screen.getByTitle('Ver notificaciones'));
    
    // Delete
    fireEvent.click(screen.getByText('Nuevos puntos de calor en Riberas'));
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Click Undo
    const undoButton = screen.getByText('DESHACER');
    fireEvent.click(undoButton);

    // Verify it is back
    expect(screen.getByText('Nuevos puntos de calor en Riberas')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    jest.useRealTimers();
  });

  test('plays sound when notification panel is opened', () => {
    const mockStart = jest.fn();
    
    window.AudioContext = jest.fn().mockImplementation(() => ({
      createOscillator: () => ({
        connect: jest.fn(),
        start: mockStart,
        stop: jest.fn(),
        frequency: { setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() },
        type: 'sine'
      }),
      createGain: () => ({
        connect: jest.fn(),
        gain: { setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() }
      }),
      destination: {},
      currentTime: 0
    })) as any;

    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    
    fireEvent.click(screen.getByTitle('Ver notificaciones'));
    
    expect(mockStart).toHaveBeenCalled();
  });

  test('auto-closes notification panel after timeout', () => {
    jest.useFakeTimers();
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    
    // Open
    fireEvent.click(screen.getByTitle('Ver notificaciones'));
    expect(screen.getByText('Notificaciones')).toBeInTheDocument();

    // Fast forward
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.queryByText('Notificaciones')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  test('keeps notification panel open on hover', () => {
    jest.useFakeTimers();
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    
    // Open
    fireEvent.click(screen.getByTitle('Ver notificaciones'));
    const panelHeader = screen.getByText('Notificaciones');
    // eslint-disable-next-line testing-library/no-node-access
    const panelContainer = panelHeader.closest('div')?.parentElement;

    if (panelContainer) {
      fireEvent.mouseEnter(panelContainer);
      act(() => { jest.advanceTimersByTime(6000); });
      expect(screen.getByText('Notificaciones')).toBeInTheDocument();
    }

    jest.useRealTimers();
  });

  test('notification badge pulses when unread critical alerts exist', () => {
    jest.useFakeTimers();
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    
    // El estado inicial tiene 1 alerta crítica no leída, debe parpadear
    const badge = screen.getByText('3');
    expect(badge).toHaveClass('animate-pulse');

    // Abrir dropdown y eliminar la alerta crítica
    fireEvent.click(screen.getByTitle('Ver notificaciones'));
    const criticalNotif = screen.getByText('Alerta Crítica');
    fireEvent.click(criticalNotif);

    act(() => { jest.advanceTimersByTime(300); });

    // El badge debe actualizarse a 2 y dejar de parpadear (solo quedan warning/info)
    const updatedBadge = screen.getByText('2');
    expect(updatedBadge).not.toHaveClass('animate-pulse');
    
    jest.useRealTimers();
  });

  test('filters notifications to show only critical ones', () => {
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={jest.fn()} />);
    
    // Open dropdown
    fireEvent.click(screen.getByTitle('Ver notificaciones'));
    
    // Check initial state (all notifications present)
    expect(screen.getByText('Alerta Crítica')).toBeInTheDocument();
    expect(screen.getByText('Reporte Ciudadano')).toBeInTheDocument();

    // Click filter button
    const filterButton = screen.getByTitle('Ver solo críticas');
    fireEvent.click(filterButton);

    // Check filtered state
    expect(screen.getByText('Alerta Crítica')).toBeInTheDocument();
    expect(screen.queryByText('Reporte Ciudadano')).not.toBeInTheDocument();

    // Toggle back
    fireEvent.click(screen.getByTitle('Ver todas'));
    expect(screen.getByText('Reporte Ciudadano')).toBeInTheDocument();
  });

  test('calls onLogout when logout button is clicked', () => {
    const handleLogout = jest.fn();
    render(<Header isDarkMode={false} toggleTheme={jest.fn()} onLogout={handleLogout} />);
    
    const logoutButton = screen.getByLabelText('Cerrar Sesión');
    fireEvent.click(logoutButton);
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});