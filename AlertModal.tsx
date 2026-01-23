import React, { useState } from 'react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose }) => {
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-card-dark rounded-2xl shadow-2xl max-w-lg w-full transform transition-all scale-100 border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-red-50 dark:bg-red-900/10 p-5 flex items-center gap-4 border-b border-red-100 dark:border-red-900/30">
          <div className="bg-alert-red text-white p-2.5 rounded-full shrink-0 animate-pulse shadow-lg shadow-red-200 dark:shadow-none">
            <span className="material-icons-outlined text-2xl">warning</span>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-alert-red uppercase leading-tight tracking-tight">¡ALERTA CRÍTICA DETECTADA!</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-5 font-medium leading-relaxed">
            Se han detectado nuevos puntos de calor en <span className="font-bold text-gray-900 dark:text-white">Riberas Del Bravo</span>. Siga estas recomendaciones preventivas:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-[3px] border-brand-dark-green hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
              <span className="material-icons-outlined text-brand-dark-green mt-0.5">do_not_disturb_on</span>
              <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">Evite realizar quemas al aire libre</span>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-[3px] border-brand-dark-green hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
              <span className="material-icons-outlined text-brand-dark-green mt-0.5">cleaning_services</span>
              <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">Mantenga limpios sus predios de maleza seca</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-[3px] border-brand-dark-green hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
              <div className="flex items-start gap-3">
                <span className="material-icons-outlined text-brand-dark-green mt-0.5">notification_important</span>
                <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">Reporte cualquier columna de humo al 911</span>
              </div>
              <div className="flex gap-4 items-center px-2">
                <span className="material-symbols-outlined text-blue-600 text-xl" title="Seguridad Pública">local_police</span>
                <span className="material-symbols-outlined text-red-600 text-xl" title="Cruz Roja">medical_services</span>
                <span className="material-symbols-outlined text-orange-600 text-xl" title="Bomberos">fire_truck</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 text-center">Difundir Alerta</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full text-sm font-bold transition-transform active:scale-95 shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                WhatsApp
              </button>
              
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1877F2] hover:bg-[#156ad8] text-white rounded-full text-sm font-bold transition-transform active:scale-95 shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                Facebook
              </button>
              
              <button 
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full text-sm font-bold transition-transform active:scale-95 shadow-md relative"
              >
                <span className="material-icons-outlined text-lg">link</span>
                Enlace
                {showToast && (
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">Copiado</div>
                )}
              </button>
            </div>
          </div>
          
          <p className="mt-4 text-[10px] text-gray-400 text-center leading-tight mx-auto max-w-sm">
            El nivel de riesgo representa una probabilidad relativa comparativa, no una predicción ni una orden operativa.
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cerrar
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-brand-dark-green hover:bg-emerald-900 shadow-md transition-all flex items-center gap-2 transform active:scale-95"
          >
            <span className="material-icons-outlined text-sm">map</span>
            Ver Mapa de Riesgo
          </button>
        </div>
      </div>
    </div>
  );
};