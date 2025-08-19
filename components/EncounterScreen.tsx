
import React from 'react';
import { GeminiEncounterResponse, EncounterChoice } from '../types';

interface EncounterScreenProps {
  encounter: GeminiEncounterResponse;
  onResolve: (choice: EncounterChoice) => void;
}

const EncounterScreen: React.FC<EncounterScreenProps> = ({ encounter, onResolve }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in p-4 text-center">
      <h2 className="text-2xl font-bold text-purple-400 mb-4">Kỳ Ngộ Bất Ngờ</h2>
      <p className="text-gray-300 mb-8 whitespace-pre-wrap">{encounter.description}</p>
      <div className="w-full max-w-md space-y-4">
        {encounter.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onResolve(choice)}
            className="w-full bg-gray-700 border border-purple-500/30 text-purple-300 font-semibold py-3 px-4 rounded-lg hover:bg-gray-600 hover:border-purple-500/60 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/10"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EncounterScreen;
