
import React from 'react';

interface ActionsPanelProps {
  onCultivate: () => void;
  onBreakthrough: () => void;
  onStartEncounter: () => void;
  isLoading: boolean;
  canBreakthrough: boolean;
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({ onCultivate, onBreakthrough, onStartEncounter, isLoading, canBreakthrough }) => {
  const actionsDisabled = isLoading;

  return (
    <div className="panel">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Hành Động</h3>
      <div className="flex flex-col gap-4">
        <button
          onClick={onCultivate}
          disabled={actionsDisabled}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-500 hover:to-indigo-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-wait disabled:bg-gray-600 disabled:from-gray-600 disabled:shadow-none"
        >
          {isLoading ? 'Đang Bận...' : 'Thiên Đình (Tăng EXP, MP)'}
        </button>
        <button
          onClick={onStartEncounter}
          disabled={actionsDisabled}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-500 hover:to-indigo-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-wait disabled:bg-gray-600 disabled:from-gray-600 disabled:shadow-none"
        >
          {isLoading ? 'Đang Bận...' : 'Khám Phá (Kỳ Ngộ)'}
        </button>
        <button
          onClick={onBreakthrough}
          disabled={!canBreakthrough || actionsDisabled}
          className="w-full bg-gradient-to-r from-green-600 to-teal-700 text-white font-bold py-3 px-4 rounded-lg hover:from-green-500 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:from-gray-600 disabled:shadow-none"
        >
          {isLoading ? 'Đang Bận...' : 'Đột Phá Cảnh Giới!'}
        </button>
      </div>
    </div>
  );
};

export default ActionsPanel;
