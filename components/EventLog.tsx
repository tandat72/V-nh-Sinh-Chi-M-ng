
import React from 'react';
import { GameEvent } from '../types';

interface EventLogProps {
  log: GameEvent[];
}

const EventLog: React.FC<EventLogProps> = ({ log }) => {
  const getLogColor = (type: GameEvent['type']): string => {
    switch (type) {
      case 'system':
        return 'text-gray-400 italic';
      case 'cultivate':
        return 'text-sky-400';
      case 'breakthrough':
        return 'text-yellow-400 font-bold';
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
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-yellow-400/80 mb-2 border-b border-yellow-500/20 pb-1">Nhật Ký Tu Luyện</h3>
      <div className="h-64 overflow-y-auto bg-gray-900/80 rounded-md p-3 border border-gray-700 flex flex-col-reverse shadow-inner">
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

export default EventLog;
