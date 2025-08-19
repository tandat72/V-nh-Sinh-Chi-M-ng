import React, { useState, useEffect, useCallback } from 'react';
import { Player, GameEvent } from '../types';
import StatDisplay from './StatDisplay';
import EventLog from './EventLog';

interface GameScreenProps {
  player: Player;
  log: GameEvent[];
  onCultivate: () => void;
  onBreakthrough: () => void;
  onStartEncounter: () => void;
  isLoading: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ player, log, onCultivate, onBreakthrough, onStartEncounter, isLoading }) => {
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditationProgress, setMeditationProgress] = useState(0);

  useEffect(() => {
    let timer: number;
    if (isMeditating) {
      timer = window.setInterval(() => {
        setMeditationProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsMeditating(false);
            onCultivate();
            return 0;
          }
          return prev + 1; // 100 steps over 10s => 1 step per 100ms
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isMeditating, onCultivate]);

  const handleCultivateClick = () => {
    if (!isLoading && !isMeditating) {
      setIsMeditating(true);
      setMeditationProgress(0);
    }
  };

  const cultivationProgress = (player.cultivation / player.realm.required) * 100;
  const canBreakthrough = player.cultivation >= player.realm.required;
  const actionsDisabled = isLoading || isMeditating;

  const meditationTimeLeft = Math.ceil((100 - meditationProgress) / 10);
  
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatDisplay label="Đạo Danh" value={player.name} />
        <StatDisplay label="Cảnh Giới" value={player.realm.name} className="text-yellow-400" />
        <StatDisplay label="Thọ Nguyên" value={`${player.lifespan} năm`} />
        <StatDisplay label="Linh Căn" value={player.spiritualRoot.name} />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-1 text-sm text-gray-400">
          <span>Tu Vi</span>
          <span>{`${Math.floor(player.cultivation)} / ${player.realm.required}`}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 border border-yellow-500/30">
          <div
            className="bg-gradient-to-r from-yellow-500 to-amber-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(cultivationProgress, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <button
          onClick={handleCultivateClick}
          disabled={actionsDisabled}
          className="relative overflow-hidden col-span-1 sm:col-span-1 bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-wait disabled:bg-gray-600 disabled:shadow-none"
        >
          <span className="relative z-10">
             {isMeditating ? `Nhập Định... (${meditationTimeLeft}s)` : 'Bế Quan Tu Luyện'}
          </span>
          {isMeditating && (
             <div 
               className="absolute top-0 left-0 h-full bg-sky-400/50" 
               style={{ width: `${meditationProgress}%`}}
            />
          )}
        </button>
        <button
          onClick={onStartEncounter}
          disabled={actionsDisabled}
          className="col-span-1 sm:col-span-1 bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-wait disabled:bg-gray-600 disabled:shadow-none"
        >
          {isLoading ? 'Đang tìm kiếm...' : 'Kỳ Ngộ'}
        </button>
        <button
          onClick={onBreakthrough}
          disabled={!canBreakthrough || actionsDisabled}
          className="col-span-1 sm:col-span-1 bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-3 px-4 rounded-lg hover:from-red-500 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:from-gray-600 disabled:shadow-none"
        >
          {isLoading ? 'Đang đột phá...' : 'Nếm Thử Đột Phá'}
        </button>
      </div>

      <EventLog log={log} />
    </div>
  );
};

export default GameScreen;