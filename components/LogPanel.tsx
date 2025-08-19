
import React from 'react';
import { GameEvent } from '../types';

interface LogPanelProps {
  log: GameEvent[];
}

const LogPanel: React.FC<LogPanelProps> = ({ log }) => {
  const getLogColor = (type: GameEvent['type']): string => {
    switch (type) {
      case 'system':
        return 'text-gray-400 italic';
      case 'cultivate':
        return 'text-sky-400';
      case 'breakthrough':
        return 'text-yellow-300 font-bold text-glow';
      case 'event':
        return 'text-teal-400';
      case 'danger':
        return 'text-red-500 font-semibold';
      case 'encounter':
        return 'text-purple-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="panel h-full flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Nhật Ký Tu Luyện</h3>
      <div className="h-96 overflow-y-auto bg-black/30 rounded-md p-3 border border-purple-500/20 flex flex-col-reverse shadow-inner flex-grow">
        <ul className="space-y-2">
          {log.map((entry, index) => (
            <li key={index} className={`text-sm animate-fade-in-up ${getLogColor(entry.type)}`}>
              {entry.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LogPanel;
