import React from 'react';

export const MapSection: React.FC = () => {
  return (
    <section className="col-span-12 lg:col-span-6 xl:col-span-7 relative flex flex-col">
      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg flex-grow overflow-hidden relative border border-gray-200 dark:border-gray-700 min-h-[400px]">
        {/* Search Bar */}
        <div className="absolute top-4 left-4 z-10 w-64 md:w-80">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar ubicación..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg shadow-md border-0 text-sm focus:ring-2 focus:ring-brand-green dark:bg-gray-800 dark:text-white" 
            />
            <span className="material-icons-outlined absolute left-3 top-2.5 text-gray-400 text-sm">search</span>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col overflow-hidden">
            <button className="p-2 hover:bg-gray-50 text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
              <span className="material-icons-outlined">add</span>
            </button>
            <button className="p-2 hover:bg-gray-50 text-gray-600 dark:text-gray-300">
              <span className="material-icons-outlined">remove</span>
            </button>
          </div>
          <button className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 text-gray-600 dark:text-gray-300" title="Capas">
            <span className="material-icons-outlined">layers</span>
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 max-w-[240px]">
          <h4 className="text-[10px] font-bold mb-2 uppercase tracking-tight text-gray-500">Nivel de Riesgo</h4>
          <div className="flex items-center gap-4 text-[10px] font-bold mb-2">
            <div className="flex items-center gap-1.5 text-alert-orange"><span className="w-2.5 h-2.5 rounded-full bg-alert-orange"></span> BAJO</div>
            <div className="flex items-center gap-1.5 text-alert-yellow"><span className="w-2.5 h-2.5 rounded-full bg-alert-yellow"></span> MEDIO</div>
            <div className="flex items-center gap-1.5 text-alert-red"><span className="w-2.5 h-2.5 rounded-full bg-alert-red"></span> ALTO</div>
          </div>
          <p className="text-[10px] leading-tight text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-2">
            El nivel de riesgo representa una probabilidad relativa comparativa, no una predicción ni una orden operativa.
          </p>
        </div>

        {/* Map Container Visuals */}
        <div className="map-container w-full h-full relative bg-gray-200">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[35%] left-[50%] w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.5)_0%,rgba(251,191,36,0.3)_40%,transparent_70%)] blur-2xl opacity-90 mix-blend-multiply dark:mix-blend-screen -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="map-river top-10 left-0 w-full h-12 -rotate-3"></div>
          <div className="map-street top-0 bottom-0 left-[30%] w-6 rotate-12"></div>
          <div className="map-street top-0 bottom-0 left-[60%] w-4 -rotate-6"></div>
          
          {/* Map Marker */}
          <div className="absolute top-[45%] left-[52%] z-20 flex flex-col items-center group cursor-pointer">
            <div className="relative">
              <span className="material-icons-outlined text-5xl text-brand-dark-green drop-shadow-xl animate-bounce">location_on</span>
              <div className="absolute inset-0 bg-brand-green/20 rounded-full scale-150 animate-ping"></div>
            </div>
            <div className="bg-white/95 dark:bg-gray-800 p-2 rounded-lg shadow-lg -mt-1 text-brand-dark-green border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-1 max-w-[180px] backdrop-blur-sm transition-all transform group-hover:scale-105">
              <span className="text-[10px] font-bold whitespace-nowrap">RIBERAS DEL BRAVO</span>
              <p className="text-[9px] leading-tight text-gray-500 text-center font-normal">
                Nivel de Riesgo Crítico detectado. Verifique protocolos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Control */}
      <div className="mt-4 bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-sm flex items-center gap-4 border border-gray-100 dark:border-gray-700">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-brand-green">
          <span className="material-icons-outlined">play_arrow</span>
        </button>
        <div className="flex-grow">
          <div className="flex justify-between text-[10px] text-gray-500 mb-1 font-bold uppercase">
            <span>-24h</span>
            <span className="text-brand-green">TIEMPO REAL</span>
            <span>PROYECCIÓN +12h</span>
          </div>
          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-brand-green rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};