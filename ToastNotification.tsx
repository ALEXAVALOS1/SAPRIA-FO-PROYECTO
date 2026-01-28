import React, { useEffect } from 'react';

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  className?: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ 
  message, 
  isVisible, 
  onClose, 
  duration = 2000,
  className = ''
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`absolute bg-black text-white text-xs px-2 py-1 rounded animate-fade-in-up z-50 ${className}`}>
      {message}
    </div>
  );
};