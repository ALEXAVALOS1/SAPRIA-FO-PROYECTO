import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-card-light dark:bg-card-dark rounded-xl shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};