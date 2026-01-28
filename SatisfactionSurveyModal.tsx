import React, { useState, useEffect, useRef } from 'react';

interface SatisfactionSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SatisfactionSurveyModal: React.FC<SatisfactionSurveyModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => {
      if (isMounted.current) {
        setSubmitted(false);
        setRating(0);
        setComment('');
        onClose();
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true"></div>
      <div className="relative bg-white dark:bg-card-dark rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
        {submitted ? (
          <div className="text-center py-8">
            <span className="material-icons-outlined text-5xl text-brand-green mb-4">check_circle</span>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">¡Gracias por tu opinión!</h3>
            <p className="text-gray-600 dark:text-gray-300">Tus comentarios nos ayudan a mejorar.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Encuesta de Satisfacción</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">¿Qué tan útil te pareció la información?</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      aria-label={`Calificar con ${star} estrellas`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comentarios adicionales
                  {rating > 0 && rating <= 3 && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${rating > 0 && rating <= 3 && comment.trim() === '' ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-brand-green'} bg-gray-50 dark:bg-gray-800 focus:ring-2 outline-none text-sm`}
                  rows={4}
                  placeholder={rating > 0 && rating <= 3 ? "Por favor, cuéntanos cómo podemos mejorar..." : "Escribe aquí tus sugerencias..."}
                ></textarea>
                {rating > 0 && rating <= 3 && comment.trim() === '' && (
                  <p className="text-xs text-red-500 mt-1">Por favor, añade un comentario para calificaciones bajas.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={rating === 0 || (rating <= 3 && comment.trim() === '')}
                className="w-full py-3 bg-brand-green hover:bg-brand-dark-green disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold shadow-md transition-colors"
              >
                Enviar Comentarios
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};