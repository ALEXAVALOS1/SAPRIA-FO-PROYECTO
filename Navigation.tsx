import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <div className="bg-primary shadow-lg sticky top-0 z-50 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-6 text-white/90 text-sm font-medium overflow-x-auto no-scrollbar">
            <a className="text-white border-b-2 border-secondary pb-4 pt-4 whitespace-nowrap" href="#">Dashboard Principal</a>
            <a className="hover:text-white pb-4 pt-4 transition-colors whitespace-nowrap" href="#">Reportes Históricos</a>
            <a className="hover:text-white pb-4 pt-4 transition-colors whitespace-nowrap" href="#">Alertas Activas</a>
            <a className="hover:text-white pb-4 pt-4 transition-colors whitespace-nowrap" href="#">Recursos y Ayuda</a>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <button className="bg-brand-green hover:bg-brand-dark-green text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-md transition-all transform hover:scale-105 border border-white/10">
              <span className="material-icons-outlined text-sm">picture_as_pdf</span> 
              Generar Reporte PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};