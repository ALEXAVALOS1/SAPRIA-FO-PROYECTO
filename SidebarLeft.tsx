import React from 'react';

interface SidebarLeftProps {
  onTriggerAlert: () => void;
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({ onTriggerAlert }) => {
  return (
    <aside className="col-span-12 lg:col-span-3 xl:col-span-2 flex flex-col gap-4 overflow-y-auto pr-1">
      <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-sm border-l-4 border-alert-red">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-alert-red text-sm uppercase">Alerta Crítica</h3>
          <span className="animate-pulse h-2 w-2 rounded-full bg-alert-red"></span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">3 nuevos focos de incendio detectados en Riberas Del Bravo.</p>
        <button 
          onClick={onTriggerAlert}
          className="text-xs font-semibold text-alert-red hover:underline text-left"
        >
          Ver detalles
        </button>
      </div>

      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-4 flex-grow flex flex-col">
        <h2 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
          <span className="material-icons-outlined text-brand-green">tune</span> Capas de Monitoreo
        </h2>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-brand-green rounded border-gray-300 focus:ring-brand-green" />
            <span className="text-xs font-medium flex-1">Incendios Activos</span>
            <span className="material-icons-outlined text-alert-red text-lg">local_fire_department</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-brand-green rounded border-gray-300 focus:ring-brand-green" />
            <span className="text-xs font-medium flex-1">Puntos de Calor</span>
            <span className="material-icons-outlined text-alert-yellow text-lg">wb_sunny</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-brand-green rounded border-gray-300 focus:ring-brand-green" />
            <span className="text-xs font-medium flex-1">Calidad del Aire</span>
            <span className="material-icons-outlined text-gray-400 text-lg">air</span>
          </label>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Historial Térmico</h3>
            <span className="material-icons-outlined text-orange-500 text-sm">history_edu</span>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-lg p-3">
            <label className="relative inline-flex items-center cursor-pointer mb-3 w-full">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-orange-500"></div>
              <span className="ml-3 text-[10px] font-bold text-gray-700 dark:text-gray-300">Capa de Calor</span>
            </label>
            
            <div className="space-y-2">
              <input type="date" defaultValue="2023-01-01" className="w-full text-[10px] py-1.5 px-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:ring-1 focus:ring-orange-500 outline-none" />
              <input type="date" defaultValue="2023-10-31" className="w-full text-[10px] py-1.5 px-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:ring-1 focus:ring-orange-500 outline-none" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};