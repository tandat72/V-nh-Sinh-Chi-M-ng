
import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  colorClass: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max, colorClass }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const displayPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div>
      <div className="flex justify-between items-center mb-1 text-sm">
        <span className="font-semibold text-gray-300">{label}</span>
        <span className="text-gray-400">{`${Math.floor(value)} / ${max} (${Math.floor(displayPercentage)}%)`}</span>
      </div>
      <div className="w-full bg-black/30 rounded-full h-3.5 border border-white/10">
        <div
          className={`${colorClass} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${displayPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
