
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
    <div className="flex flex-col items-center justify-center h-full animate-fade-in text-center">
      <h2 className="text-3xl font-bold text-purple-300 text-glow mb-4">Nhập Đạo Danh</h2>
      <p className="text-gray-400 mb-8">Hãy cho biết danh xưng của đạo hữu trên con đường trường sinh bất tử này.</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ví dụ: Vô Danh..."
          className="w-full px-4 py-3 bg-black/30 border border-purple-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
          required
          maxLength={20}
        />
        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-500 hover:to-indigo-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!name.trim()}
        >
          Gia Nhập Thế Giới
        </button>
      </form>
    </div>
  );
};

export default StartScreen;
