import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-10 pb-4 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm mb-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 bg-white/5 p-6 rounded-lg border border-white/10">
            <img 
              alt="Gobierno de Juárez" 
              className="h-16 w-auto filter invert brightness-0 opacity-80" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEG7L3RZabm-gyIGMhAD_6u9GToBw0lm3zo4G-HK3qxvNdE58Y59KV9QiGH8hQduA7q0FSp0nxWs5XLJXzdfc-f7U2_R3ko-Cfr_GOiIQ--3swubxf8_bmnuECooyo5cRGJJQpAg7e0DrSpSeTcc8bQpPG3PKwMLDOuzRQCQAf7N2Xabw10QGzHKVFSv9BP8FX0VyimpyzhkmeAjdMRbRzxqEkiBf-g_bfgTgOt3fUgfp0kUilJucmrGrQtNGza8aUGgGl7cCXs84" 
            />
            <div className="border-l border-white/20 pl-4">
              <h2 className="text-2xl font-bold tracking-tighter text-secondary">SINAPRIA-FO</h2>
              <p className="text-[10px] leading-tight opacity-90 mt-1 max-w-[200px]">
                Es el Sistema de Alertamiento Temprano Para Incendios en el Municipio de Ciudad Juárez. Monitoreo Constante
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h5 className="font-bold mb-4 text-secondary uppercase tracking-widest text-xs">Enlaces Estratégicos</h5>
          <ul className="space-y-2 opacity-80 text-xs font-medium">
            <li><a href="#" className="hover:text-secondary flex items-center gap-2"><span className="material-icons-outlined text-sm">shield</span> Protección Civil</a></li>
            <li><a href="#" className="hover:text-secondary flex items-center gap-2"><span className="material-icons-outlined text-sm">fire_truck</span> Cuerpo de Bomberos</a></li>
            <li><a href="#" className="hover:text-secondary flex items-center gap-2"><span className="material-icons-outlined text-sm">description</span> Plan de Contingencia</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-bold mb-4 text-secondary uppercase tracking-widest text-xs">Atención de Emergencias</h5>
          <div className="flex items-center gap-6 mb-4">
            <p className="text-5xl font-black text-white tracking-[0.45em]">911</p>
            <div className="flex gap-4 items-center border-l border-white/20 pl-6">
              <span className="material-symbols-outlined text-blue-500 text-3xl icon-relief" title="Seguridad Pública">local_police</span>
              <span className="material-symbols-outlined text-red-500 text-3xl icon-relief" title="Cruz Roja">medical_services</span>
              <span className="material-symbols-outlined text-orange-500 text-3xl icon-relief" title="Bomberos">fire_truck</span>
            </div>
          </div>
          <p className="text-[10px] opacity-70 font-medium leading-normal uppercase tracking-wide">
            Centro de Monitoreo y Respuesta Inmediata. Operación 24/7 en Ciudad Juárez.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-4 border-t border-white/10 text-center">
        <p className="text-[10px] opacity-60 font-bold tracking-widest uppercase">
          © 2026 Merkatics Ciudad Juárez - SINAPRIA-FO - Juárez Municipio
        </p>
      </div>
    </footer>
  );
};