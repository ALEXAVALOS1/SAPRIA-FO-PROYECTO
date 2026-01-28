import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

// Mock child components to isolate App logic
jest.mock('./Header', () => ({ 
  Header: ({ onLogout }: { onLogout: () => void }) => (
    <div data-testid="header"><button onClick={onLogout}>Logout</button></div>
  ) 
}));
jest.mock('./Navigation', () => ({ Navigation: () => <div data-testid="navigation">Navigation</div> }));
jest.mock('./MapSection', () => ({ MapSection: () => <div data-testid="map-section">MapSection</div> }));
jest.mock('./SidebarRight', () => ({ 
  SidebarRight: ({ isOpen, userRole }: { isOpen: boolean, userRole: string }) => (
    <div data-testid="sidebar-right" data-is-open={isOpen.toString()} data-role={userRole}>SidebarRight</div>
  ) 
}));
jest.mock('./Footer', () => ({ Footer: () => <div data-testid="footer">Footer</div> }));

// Mock SidebarLeft to test the alert trigger interaction
jest.mock('./SidebarLeft', () => ({
  SidebarLeft: ({ onTriggerAlert }: { onTriggerAlert: () => void }) => (
    <button data-testid="sidebar-trigger" onClick={onTriggerAlert}>
      Trigger Alert
    </button>
  ),
}));

// Mock SatisfactionSurveyModal
jest.mock('./SatisfactionSurveyModal', () => ({
  SatisfactionSurveyModal: ({ isOpen }: { isOpen: boolean }) => 
    isOpen ? <div data-testid="survey-modal">Survey Modal</div> : null,
}));

// Mock Login
jest.mock('./Login', () => ({
  Login: ({ onLogin }: { onLogin: (role: string) => void }) => <button onClick={() => onLogin('admin')}>Login Button</button>
}));

describe('App Component', () => {
  const originalMatchMedia = window.matchMedia;
  const originalNotification = window.Notification;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Mock Notification API
    Object.defineProperty(window, 'Notification', {
      writable: true,
      value: jest.fn().mockImplementation((title, options) => ({
        title,
        ...options,
        close: jest.fn(),
      })),
    });
    // Asignar propiedades estáticas al mock de Notification
    (window.Notification as any).permission = 'granted';
    (window.Notification as any).requestPermission = jest.fn().mockResolvedValue('granted');
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
    window.Notification = originalNotification;
  });

  // Helper para simular login antes de cada prueba que requiera el dashboard
  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
  };

  test('renders main layout components', () => {
    login();
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('map-section')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-right')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('modal is open by default', () => {
    login();
    render(<App />);
    // Check for text present in the AlertModal
    expect(screen.getByText(/¡ALERTA CRÍTICA DETECTADA!/i)).toBeInTheDocument();
  });

  test('closing modal hides it', () => {
    login();
    render(<App />);
    const closeButton = screen.getByText('Cerrar');
    fireEvent.click(closeButton);
    expect(screen.queryByText(/¡ALERTA CRÍTICA DETECTADA!/i)).not.toBeInTheDocument();
  });

  test('triggering alert from sidebar opens modal', () => {
    login();
    render(<App />);
    // Close it first
    fireEvent.click(screen.getByText('Cerrar'));
    expect(screen.queryByText(/¡ALERTA CRÍTICA DETECTADA!/i)).not.toBeInTheDocument();

    // Trigger from sidebar mock
    fireEvent.click(screen.getByTestId('sidebar-trigger'));
    expect(screen.getByText(/¡ALERTA CRÍTICA DETECTADA!/i)).toBeInTheDocument();
  });

  test('opens satisfaction survey modal when button is clicked', () => {
    login();
    render(<App />);
    const surveyButton = screen.getByText('Encuesta de Satisfacción');
    expect(surveyButton).toBeInTheDocument();
    
    expect(screen.queryByTestId('survey-modal')).not.toBeInTheDocument();
    fireEvent.click(surveyButton);
    expect(screen.getByTestId('survey-modal')).toBeInTheDocument();
  });

  test('triggers browser notification when alert is activated', () => {
    login();
    render(<App />);
    // Cerrar modal primero para limpiar estado
    fireEvent.click(screen.getByText('Cerrar'));

    // Disparar alerta desde el sidebar mock
    fireEvent.click(screen.getByTestId('sidebar-trigger'));

    expect(window.Notification).toHaveBeenCalledWith(
      '¡ALERTA CRÍTICA DETECTADA!',
      expect.objectContaining({
        body: expect.stringContaining('Riberas Del Bravo'),
      })
    );
  });

  test('adjusts sidebar state based on screen width', () => {
    login();
    const map: Record<string, any[]> = {};
    
    // Sobrescribir matchMedia para este test específico
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true, // Default large screen
      media: query,
      onchange: null,
      addEventListener: jest.fn((event, callback) => {
        if (!map[query]) map[query] = [];
        map[query].push(callback);
      }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<App />);
    const sidebar = screen.getByTestId('sidebar-right');
    
    // Inicialmente abierto (matches: true)
    expect(sidebar).toHaveAttribute('data-is-open', 'true');

    // Simular cambio a pantalla pequeña
    act(() => {
      const handlers = map['(min-width: 1024px)'] || [];
      handlers.forEach(cb => cb({ matches: false } as MediaQueryListEvent));
    });

    expect(sidebar).toHaveAttribute('data-is-open', 'false');
  });

  test('shows login screen when not authenticated', () => {
    localStorage.removeItem('isAuthenticated');
    render(<App />);
    expect(screen.getByText('Login Button')).toBeInTheDocument();
    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
  });

  test('login and logout flow', () => {
    localStorage.removeItem('isAuthenticated');
    render(<App />);
    
    // Login
    fireEvent.click(screen.getByText('Login Button'));
    expect(screen.getByTestId('header')).toBeInTheDocument();

    // Logout
    fireEvent.click(screen.getByText('Logout'));
    expect(screen.getByText('Login Button')).toBeInTheDocument();
    expect(localStorage.getItem('userRole')).toBeNull();
  });
});