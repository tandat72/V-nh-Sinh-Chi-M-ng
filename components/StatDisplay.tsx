
import React from 'react';

interface StatDisplayProps {
  label: string;
  value: string | number;
  className?: string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, className = '' }) => {
  return (
    <div className="bg-gray-900/70 p-4 rounded-lg border border-yellow-500/20 text-center shadow-inner">
      <p className="text-sm text-gray-400 uppercase tracking-wider">{label}</p>
      <p className={`text-lg font-bold truncate ${className}`}>{value}</p>
    </div>
  );
};

export default StatDisplay;
