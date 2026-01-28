import React from 'react';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  label, 
  checked, 
  onChange,
  className = ''
}) => {
  return (
    <label className={`relative inline-flex items-center cursor-pointer w-full ${className}`}>
      <input 
        type="checkbox" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer" 
      />
      <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-orange-500"></div>
      <span className="ml-3 text-[10px] font-bold text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
};