import React, { useState, useEffect, useRef } from 'react';
import { ToastNotification } from './ToastNotification';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose }) => {
  const [showToast, setShowToast] = useState(false);
  const isMounted = useRef(false);
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const showCopiedToast = () => {
    if (!isMounted.current) return;
    setShowToast(true);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      if (isMounted.current) setShowToast(false);
      toastTimeoutRef.current = null;
    }, 3000);
  };

  const handleCopyLink = async () => {
    const alertLink = window.location.href;
    const alertText = `¡Alerta Crítica Detectada en Riberas Del Bravo! Más información en: ${alertLink}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(alertText);
        showCopiedToast();
        return;
      }

      // Fallback for older browsers / insecure contexts
      const textarea = document.createElement('textarea');
      textarea.value = alertText;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);

      if (successful) {
        showCopiedToast();
      } else {
        console.warn('Copiado con fallback fallido');
      }
    } catch (err) {
      console.error('Error al copiar el enlace:', err);
    }
  };

  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('¡Alerta Crítica Detectada en Riberas Del Bravo! Más información en: ');
    const shareUrl = `https://wa.me/?text=${text}${url}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
        data-testid="modal-backdrop"
      ></div>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-white dark:bg-card-dark rounded-2xl shadow-2xl max-w-lg w-full transform transition-all scale-100 border border-gray-100 dark:border-gray-800 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-red-50 dark:bg-red-900/10 p-5 flex items-center gap-4 border-b border-red-100 dark:border-red-900/30">
          <div className="bg-alert-red text-white p-2.5 rounded-full shrink-0 animate-pulse shadow-lg shadow-red-200 dark:shadow-none">
            <span className="material-icons-outlined text-2xl" aria-hidden="true">warning</span>
          </div>
          <div>
            <h2 id="modal-title" className="text-lg md:text-xl font-bold text-alert-red uppercase leading-tight tracking-tight">
              ¡ALERTA CRÍTICA DETECTADA!
            </h2>
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
                <span className="material-symbols-outlined text-blue-600 text-xl" title="Seguridad Pública" aria-hidden="true">local_police</span>
                <span className="material-symbols-outlined text-red-600 text-xl" title="Cruz Roja" aria-hidden="true">medical_services</span>
                <span className="material-symbols-outlined text-orange-600 text-xl" title="Bomberos" aria-hidden="true">fire_truck</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 text-center">Difundir Alerta</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full text-sm font-bold transition-transform active:scale-95"
                aria-label="Compartir en WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.769.967-.94 1.165-.173.197-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.298-.495.1-.197.05-.371-.025-.52-.076-.148-.67-1.612-.918-2.207-.242-.579-.487-.5-.67-.51l-.57-.01c-.197 0-.52.074-.793.371s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487 2.981 1.288 2.981.86 3.517.808.536-.05 1.758-.72 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.273-.198-.57-.347z"/></svg>
                WhatsApp
              </button>

              <button
                type="button"
                onClick={handleShareFacebook}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1877F2] hover:bg-[#156ad8] text-white rounded-full text-sm font-bold transition-transform active:scale-95"
                aria-label="Compartir en Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.675V1.325C24 .597 23.403 0 22.675 0z"/></svg>
                Facebook
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full text-sm font-bold transition-transform active:scale-95"
                aria-label="Copiar enlace"
              >
                <span className="material-icons-outlined text-lg" aria-hidden="true">link</span>
                Enlace
                <ToastNotification
                  message="Copiado"
                  isVisible={showToast}
                  onClose={() => setShowToast(false)}
                  className="-top-10 left-1/2 transform -translate-x-1/2"
                />
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
            <span className="material-icons-outlined text-sm" aria-hidden="true">map</span>
            Ver Mapa de Riesgo
          </button>
        </div>
      </div>
    </div>
  );
};