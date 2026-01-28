import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`p-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-[10px] text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/30 ${className}`}>
      <button 
        onClick={onPrev}
        disabled={currentPage === 1}
        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-30 transition-colors"
        aria-label="Página anterior"
      >
        <span className="material-icons-outlined text-sm">chevron_left</span>
      </button>
      <span className="font-medium">Página {currentPage} de {totalPages}</span>
      <button 
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-30 transition-colors"
        aria-label="Página siguiente"
      >
        <span className="material-icons-outlined text-sm">chevron_right</span>
      </button>
    </div>
  );
};