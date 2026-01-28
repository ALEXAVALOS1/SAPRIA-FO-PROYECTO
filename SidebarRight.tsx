import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_EVENTS } from './mockData';

interface SidebarRightProps {
  isOpen: boolean;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

export const SidebarRight: React.FC<SidebarRightProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Lógica crítica para el test: Reiniciar a página 1 cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event =>
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE) || 1;
  
  const currentEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredEvents]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  return (
    <aside
      className={`fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white dark:bg-card-dark shadow-xl transform transition-transform duration-300 ease-in-out z-20 flex flex-col border-l border-gray-200 dark:border-gray-700 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-label="Bitácora de Eventos"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
        <h2 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
          <span className="material-icons-outlined">history</span>
          Bitácora
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
          <span className="material-icons-outlined">close</span>
        </button>
      </div>

      {/* Search Input - Requerido por el test */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar en bitácora..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-primary outline-none"
          />
          <span className="material-icons-outlined absolute left-3 top-2.5 text-gray-400 text-lg">search</span>
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {currentEvents.map(event => (
          <div key={event.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
            <div className="flex justify-between items-start mb-1">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                event.type === 'critical' ? 'bg-red-100 text-red-700' :
                event.type === 'warning' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {event.type.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">{event.date}</span>
            </div>
            <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">{event.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{event.location}</p>
          </div>
        ))}
      </div>

      {/* Controles de Paginación - Requeridos por el test */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
        <button onClick={handlePrev} disabled={currentPage === 1} aria-label="Página anterior" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30">
          <span className="material-icons-outlined">chevron_left</span>
        </button>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Página {currentPage} de {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages} aria-label="Página siguiente" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30">
          <span className="material-icons-outlined">chevron_right</span>
        </button>
      </div>
    </aside>
  );
};