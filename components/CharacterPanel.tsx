
import React from 'react';
import { Player } from '../types';
import ProgressBar from './ProgressBar';

interface CharacterPanelProps {
  player: Player;
}

const StatItem: React.FC<{ icon: string; label: string; value: string | number; valueClass?: string }> = ({ icon, label, value, valueClass = 'text-yellow-300' }) => (
  <div className="flex items-center gap-3">
    <i className={`bx ${icon} text-2xl text-purple-300`}></i>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`font-bold ${valueClass}`}>{value}</p>
    </div>
  </div>
);

const CharacterPanel: React.FC<CharacterPanelProps> = ({ player }) => {
  return (
    <div className="panel flex flex-col gap-6 h-full">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://i.imgur.com/sN44B2H.png"
          alt="Character Avatar"
          className="w-28 h-28 rounded-full border-2 border-purple-400 object-cover mb-4 shadow-lg shadow-purple-500/20"
        />
        <h2 className="text-3xl font-bold text-white">{player.name}</h2>
      </div>

      <div className="space-y-4">
         <StatItem icon='bxs-crown' label='Cảnh Giới' value={player.realm.name} />
         <StatItem icon='bxs-flag-alt' label='Tông Môn' value={player.sect} valueClass="text-white" />
         <StatItem icon='bxs-time-five' label='Tuổi' value={`${player.age} Tuổi`} valueClass="text-white" />
      </div>
      
      <div className="space-y-4 pt-4 border-t border-purple-500/20">
        <ProgressBar label="Sinh Lực (HP)" value={player.hp} max={player.maxHp} colorClass="bg-red-500" />
        <ProgressBar label="Linh Lực (MP)" value={player.mp} max={player.maxMp} colorClass="bg-blue-500" />
        <ProgressBar label="Kinh Nghiệm (EXP)" value={player.exp} max={player.realm.required} colorClass="bg-yellow-500" />
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-purple-500/20">
        <div>
          <p className="text-sm text-gray-400">Công Kích</p>
          <p className="font-bold text-white text-lg">{player.attack}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Phòng Ngự</p>
          <p className="font-bold text-white text-lg">{player.defense}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Khí Vận</p>
          <p className="font-bold text-white text-lg">{player.luck}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-purple-500/20">
        <h4 className="font-semibold mb-2 text-gray-300">Trang Bị</h4>
        <div className="text-gray-400 text-sm space-y-1">
            <p>Vũ Khí: <span className="text-white">{player.weapon}</span></p>
            <p>Giáp Trụ: <span className="text-white">{player.armor}</span></p>
        </div>
      </div>
    </div>
  );
};

export default CharacterPanel;
