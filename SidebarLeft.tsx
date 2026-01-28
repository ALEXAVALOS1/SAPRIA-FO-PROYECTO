import React from 'react';

export interface LayersState {
  activeFires: boolean;
  heatPoints: boolean;
  airQuality: boolean;
}

export interface ThermalHistoryState {
  enabled: boolean;
  startDate: string;
  endDate: string;
}

interface SidebarLeftProps {
  onTriggerAlert: () => void;
  layers: LayersState;
  onLayerChange: (layer: keyof LayersState) => void;
  thermalHistory: ThermalHistoryState;
  setThermalHistory: React.Dispatch<React.SetStateAction<ThermalHistoryState>>;
  userRole: string;
}

// Componentes UI internos para evitar dependencias externas y asegurar portabilidad
const Card: React.FC<{ className?: string; children: React.ReactNode; role?: string }> = ({ className = '', children, role }) => (
  <div className={`bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${className}`} role={role}>
    {children}
  </div>
);

const ToggleSwitch: React.FC<{ label: string; checked: boolean; onChange: (c: boolean) => void; className?: string }> = ({ label, checked, onChange, className = '' }) => (
  <label className={`flex items-center justify-between cursor-pointer ${className}`}>
    <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">{label}</span>
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className={`block w-8 h-5 rounded-full transition-colors ${checked ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
      <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${checked ? 'transform translate-x-3' : ''}`}></div>
    </div>
  </label>
);

export const SidebarLeft: React.FC<SidebarLeftProps> = ({ 
  onTriggerAlert,
  layers,
  onLayerChange,
  thermalHistory,
  setThermalHistory,
  userRole
}) => {
  return (
    <aside 
      className="col-span-12 lg:col-span-3 xl:col-span-2 flex flex-col gap-4 overflow-y-auto pr-1"
      aria-label="Controles del Mapa y Alertas"
    >
      <Card className="p-4 border-l-4 border-alert-red" role="alert">
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
      </Card>

      <Card className="p-4 flex-grow flex flex-col">
        <h2 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
          <span className="material-icons-outlined text-brand-green">tune</span> Capas de Monitoreo
        </h2>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <input 
              type="checkbox" 
              checked={layers.activeFires}
              onChange={() => onLayerChange('activeFires')}
              className="form-checkbox h-4 w-4 text-brand-green rounded border-gray-300 focus:ring-brand-green" />
            <span className="text-xs font-medium flex-1">Incendios Activos</span>
            <span className="material-icons-outlined text-alert-red text-lg">local_fire_department</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <input 
              type="checkbox" 
              checked={layers.heatPoints}
              onChange={() => onLayerChange('heatPoints')}
              className="form-checkbox h-4 w-4 text-brand-green rounded border-gray-300 focus:ring-brand-green" />
            <span className="text-xs font-medium flex-1">Puntos de Calor</span>
            <span className="material-icons-outlined text-alert-yellow text-lg">wb_sunny</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <input 
              type="checkbox" 
              checked={layers.airQuality}
              onChange={() => onLayerChange('airQuality')}
              className="form-checkbox h-4 w-4 text-brand-green rounded border-gray-300 focus:ring-brand-green" />
            <span className="text-xs font-medium flex-1">Calidad del Aire</span>
            <span className="material-icons-outlined text-gray-400 text-lg">air</span>
          </label>
        </div>

        {userRole !== 'viewer' && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Historial Térmico</h3>
            <span className="material-icons-outlined text-orange-500 text-sm">history_edu</span>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-lg p-3">
            <ToggleSwitch 
              label="Capa de Calor"
              checked={thermalHistory.enabled}
              onChange={(checked) => setThermalHistory(prev => ({ ...prev, enabled: checked }))}
              className="mb-3"
            />
            
            <div className="space-y-2">
              <input 
                type="date" 
                value={thermalHistory.startDate}
                onChange={(e) => setThermalHistory(prev => ({ ...prev, startDate: e.target.value }))}
                aria-label="Fecha de inicio" className="w-full text-[10px] py-1.5 px-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:ring-1 focus:ring-orange-500 outline-none" />
              <input 
                type="date" 
                value={thermalHistory.endDate}
                onChange={(e) => setThermalHistory(prev => ({ ...prev, endDate: e.target.value }))}
                aria-label="Fecha de fin" className="w-full text-[10px] py-1.5 px-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:ring-1 focus:ring-orange-500 outline-none" />
            </div>
          </div>
        </div>
        )}
      </Card>
    </aside>
  );
};