import React from 'react';

export const SidebarRight: React.FC = () => {
  return (
    <aside className="col-span-12 lg:col-span-3 xl:col-span-3 flex flex-col gap-4 overflow-y-auto">
      <div className="bg-card-light dark:bg-card-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Métricas del Sector</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/50">
            <div className="text-3xl font-bold text-alert-red">3</div>
            <div className="text-[10px] font-bold text-gray-600 dark:text-gray-300 mt-1 uppercase">Incendios</div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
            <div className="text-3xl font-bold text-emerald-700">84%</div>
            <div className="text-[10px] font-bold text-gray-600 dark:text-gray-300 mt-1 uppercase">Humedad</div>
          </div>
        </div>
      </div>

      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex-grow flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
          <h2 className="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-wider">Bitácora de Eventos</h2>
          <button className="text-[10px] text-brand-green font-bold uppercase hover:underline">Historial</button>
        </div>
        
        <div className="overflow-y-auto flex-grow p-2 space-y-2 max-h-[400px]">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Sector Riberas V</h4>
              <span className="text-[9px] bg-alert-red text-white px-2 py-0.5 rounded font-black flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                Alerta Analítica
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Alarma activada en sensor 04. Brigada en camino.</p>
          </div>

          <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark">
            <div className="flex justify-between items-start">
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Sector Riberas III</h4>
              <span className="text-[9px] bg-alert-orange text-white px-2 py-0.5 rounded font-black flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                Evento Reportado
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Reporte de columna de humo visible. Verificando.</p>
          </div>

          <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark">
            <div className="flex justify-between items-start">
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Sector Riberas II</h4>
              <span className="text-[9px] bg-brand-green text-white px-2 py-0.5 rounded font-black flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                Evento Controlado
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Conato de incendio controlado por residentes.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};