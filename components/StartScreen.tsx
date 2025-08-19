
import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (name: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Nhập Đạo Danh</h2>
      <p className="text-gray-400 mb-6 text-center">Hãy cho biết danh xưng của đạo hữu trên con đường trường sinh bất tử này.</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ví dụ: Hàn Lập, Lý Phàm..."
          className="w-full px-4 py-3 bg-gray-900 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow duration-300"
          required
          maxLength={20}
        />
        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-bold py-3 px-4 rounded-lg hover:from-yellow-400 hover:to-amber-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!name.trim()}
        >
          Khởi Đầu Tu Tiên
        </button>
      </form>
    </div>
  );
};

export default StartScreen;
