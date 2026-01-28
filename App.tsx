import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { SidebarLeft, LayersState, ThermalHistoryState } from './SidebarLeft';
import { MapSection } from './MapSection';
import { SidebarRight } from './SidebarRight';
import { Footer } from './Footer';
import { AlertModal } from './AlertModal';
import { SatisfactionSurveyModal } from './SatisfactionSurveyModal';
import { useNotification } from './useNotification';
import { Login } from './Login';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Inicializar estados con valores por defecto seguros para SSR
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(min-width: 1024px)').matches;
    }
    return false;
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('viewer');

  const { sendNotification } = useNotification();

  // Estado elevado para las capas y el historial
  const [layers, setLayers] = useState<LayersState>({
    activeFires: true,
    heatPoints: true,
    airQuality: false,
  });

  const [thermalHistory, setThermalHistory] = useState<ThermalHistoryState>({
    enabled: true,
    startDate: '2023-01-01',
    endDate: '2023-10-31',
  });

  const handleLayerChange = (layer: keyof LayersState) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  useEffect(() => {
    // Carga inicial de configuración desde localStorage/System
    if (typeof window !== 'undefined') {
      // Tema
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDarkMode(true);
      }

      // Autenticación
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
      setUserRole(localStorage.getItem('userRole') || 'viewer');

      // Sidebar
      if (window.matchMedia) {
        setIsRightSidebarOpen(window.matchMedia('(min-width: 1024px)').matches);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Colapsar automáticamente el sidebar en pantallas pequeñas
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = (e: MediaQueryListEvent) => setIsRightSidebarOpen(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleTriggerAlert = () => {
    setIsModalOpen(true);
    
    sendNotification('¡ALERTA CRÍTICA DETECTADA!', {
      body: 'Se han detectado nuevos puntos de calor en Riberas Del Bravo. Verifique protocolos.',
      requireInteraction: true, // La notificación se mantiene hasta que el usuario interactúa
    });
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  if (isLoading) {
    return null; // O un componente de carga <Loading />
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <AlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <SatisfactionSurveyModal isOpen={isSurveyOpen} onClose={() => setIsSurveyOpen(false)} />
          
          <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
          <Navigation />
          
          <main className="flex-grow container mx-auto px-4 py-6 grid grid-cols-12 gap-6 min-h-[calc(100vh-8rem)]">
            <SidebarLeft 
              onTriggerAlert={handleTriggerAlert} 
              layers={layers}
              onLayerChange={handleLayerChange}
              thermalHistory={thermalHistory}
              setThermalHistory={setThermalHistory}
              userRole={userRole}
            />
            <MapSection layers={layers} isRightSidebarOpen={isRightSidebarOpen} />
            <SidebarRight isOpen={isRightSidebarOpen} onClose={toggleRightSidebar} />
          </main>
          
          <Footer />
          
          <div className="fixed right-0 top-1/2 transform -translate-y-1/2 translate-x-12 hover:translate-x-0 transition-transform duration-300 z-50">
            <button 
              onClick={() => setIsSurveyOpen(true)}
              className="bg-secondary text-[#064e3b] font-black py-4 px-8 rounded-l-xl shadow-2xl rotate-90 origin-right whitespace-nowrap text-xs tracking-widest uppercase"
            >
              Encuesta de Satisfacción
            </button>
          </div>
        </>
      )}
    </div>
  );
}