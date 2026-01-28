import React, { useState, useRef, useEffect } from 'react';

// 1. Definimos una interfaz para las notificaciones para que TS no marque error
interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'critical' | 'warning' | 'info' | string;
  read: boolean;
}

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme, onLogout }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // CORRECCIÓN: Usar window.setTimeout para asegurar el tipo numérico del navegador
  const closeTimeoutRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const startCloseTimer = () => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    // Usamos window.setTimeout para evitar conflictos con NodeJS.Timeout
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsNotificationsOpen(false);
    }, 5000);
  };

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (isNotificationsOpen) {
      startCloseTimer();
    } else {
      clearCloseTimer();
    }
    return () => clearCloseTimer();
  }, [isNotificationsOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 2. Aplicamos la interfaz al estado de notificaciones
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'Alerta Crítica', message: 'Nuevos puntos de calor en Riberas', time: 'Hace 5 min', type: 'critical', read: false },
    { id: 2, title: 'Reporte Ciudadano', message: 'Columna de humo visible en Sector 3', time: 'Hace 20 min', type: 'warning', read: false },
    { id: 3, title: 'Mantenimiento', message: 'Actualización de sensores completada', time: 'Hace 1 hora', type: 'info', read: false },
  ]);

  const [exitingIds, setExitingIds] = useState<number[]>([]);
  const [lastDeleted, setLastDeleted] = useState<Notification | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const hasUnreadCritical = notifications.some(n => !n.read && n.type === 'critical');

  const displayedNotifications = showCriticalOnly 
    ? notifications.filter(n => n.type === 'critical') 
    : notifications;

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDismissNotification = (id: number) => {
    const notificationToDelete = notifications.find(n => n.id === id);
    if (notificationToDelete) {
      setLastDeleted(notificationToDelete);
      setExitingIds(prev => [...prev, id]);
      
      window.setTimeout(() => {
        if (isMounted.current) {
          setNotifications(prev => prev.filter(n => n.id !== id));
          setExitingIds(prev => prev.filter(eid => eid !== id));
        }
      }, 300);
    }
  };

  const handleUndo = () => {
    if (lastDeleted) {
      setNotifications(prev => [lastDeleted, ...prev].sort((a, b) => a.id - b.id));
      setLastDeleted(null);
    }
  };

  const playNotificationSound = () => {
    // CORRECCIÓN: Manejo más limpio de AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextClass();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  return (
    <header className="bg-primary text-white shadow-md relative z-[60]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEG7L3RZabm-gyIGMhAD_6u9GToBw0lm3zo4G-HK3qxvNdE58Y59KV9QiGH8hQduA7q0FSp0nxWs5XLJXzdfc-f7U2_R3ko-Cfr_GOiIQ--3swubxf8_bmnuECooyo5cRGJJQpAg7e0DrSpSeTcc8bQpPG3PKwMLDOuzRQCQAf7N2Xabw10QGzHKVFSv9BP8FX0VyimpyzhkmeAjdMRbRzxqEkiBf-g_bfgTgOt3fUgfp0kUilJucmrGrQtNGza8aUGgGl7cCXs84" 
              alt="Logotipo del Escudo Nacional de México" 
              className="h-10 w-auto filter brightness-0 invert opacity-90" 
            />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold leading-none tracking-tight">SINAPRIA-FO</h1>
              <p className="text-[10px] opacity-80 font-medium tracking-wider uppercase">Monitoreo Municipal Juárez</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-secondary transition-colors" title="Conoce más sobre nosotros">Quiénes somos</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button 
              className="p-2 hover:bg-white/10 rounded-full transition-colors" 
              aria-label="Abrir buscador" 
              title="Buscar en el sitio"
            >
              <span className="material-icons-outlined text-xl">search</span>
            </button>

            <button 
              onClick={toggleTheme} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors" 
              aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"} 
              title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              <span className="material-icons-outlined text-xl">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>

            {/* Notifications */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  if (!isNotificationsOpen) playNotificationSound();
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors relative" 
                aria-label={unreadCount > 0 ? `${unreadCount} no leídas` : "Sin notificaciones nuevas"} 
                title="Ver notificaciones"
              >
                <span className="material-icons-outlined text-xl">notifications</span>
                {unreadCount > 0 && (
                  <span className={`absolute top-1.5 right-1.5 w-4 h-4 bg-alert-red text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-primary ${hasUnreadCritical ? 'animate-pulse' : ''}`}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {isNotificationsOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-card-dark rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up text-gray-800 dark:text-white origin-top-right"
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={startCloseTimer}
                >
                  <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Notificaciones</h3>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setShowCriticalOnly(!showCriticalOnly)}
                        className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${showCriticalOnly ? 'text-alert-red bg-red-50 dark:bg-red-900/20' : 'text-gray-400'}`}
                        title={showCriticalOnly ? "Ver solo críticas" : "Ver todas"}
                      >
                        <span className="material-icons-outlined text-sm">filter_list</span>
                      </button>
                      <button 
                        onClick={handleMarkAllAsRead}
                        className="text-[10px] font-bold text-brand-green hover:underline px-2 py-1"
                      >
                        Marcar leídas
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto">
                    {displayedNotifications.length > 0 ? (
                      displayedNotifications.map(notification => (
                        <div 
                          key={notification.id}
                          onClick={() => handleDismissNotification(notification.id)}
                          className={`p-3 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-300 ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''} ${exitingIds.includes(notification.id) ? 'animate-fade-out' : ''}`}
                        >
                          <div className="flex gap-3">
                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notification.type === 'critical' ? 'bg-alert-red' : notification.type === 'warning' ? 'bg-alert-orange' : 'bg-blue-400'}`}></div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <h4 className={`text-xs font-bold ${notification.type === 'critical' ? 'text-alert-red' : 'text-gray-800 dark:text-gray-200'}`}>{notification.title}</h4>
                                <span className="text-[9px] text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                              </div>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{notification.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-400">
                        <span className="material-icons-outlined text-3xl mb-2 opacity-50">notifications_off</span>
                        <p className="text-xs">No hay notificaciones</p>
                      </div>
                    )}
                  </div>

                  {lastDeleted && (
                    <div className="p-2 bg-gray-900 text-white text-xs flex justify-between items-center animate-fade-in-up">
                      <span>Notificación eliminada</span>
                      <button onClick={handleUndo} className="font-bold text-brand-green hover:underline ml-2">DESHACER</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-white/20 mx-1"></div>

            <button 
              onClick={onLogout}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-red-300 hover:text-red-100" 
              aria-label="Cerrar Sesión" 
              title="Cerrar Sesión"
            >
              <span className="material-icons-outlined text-xl">logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};