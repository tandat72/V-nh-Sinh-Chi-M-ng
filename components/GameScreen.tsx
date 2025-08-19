
import React from 'react';
import { Player, GameEvent } from '../types';
import CharacterPanel from './CharacterPanel';
import ActionsPanel from './ActionsPanel';
import LogPanel from './LogPanel';

interface GameScreenProps {
  player: Player;
  log: GameEvent[];
  onCultivate: () => void;
  onBreakthrough: () => void;
  onStartEncounter: () => void;
  isLoading: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ player, log, onCultivate, onBreakthrough, onStartEncounter, isLoading }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
      <div className="lg:col-span-5">
        <CharacterPanel player={player} />
      </div>
      <div className="lg:col-span-7 flex flex-col gap-6">
        <ActionsPanel 
          onCultivate={onCultivate}
          onBreakthrough={onBreakthrough}
          onStartEncounter={onStartEncounter}
          isLoading={isLoading}
          canBreakthrough={player.exp >= player.realm.required}
        />
        <LogPanel log={log} />
      </div>
    </div>
  );
};

export default GameScreen;
