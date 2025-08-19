
import React from 'react';

const NavItem: React.FC<{ icon: string; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${active ? 'bg-purple-500/20 text-white border-b-2 border-purple-400' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
    <i className={`bx ${icon} text-xl`}></i>
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center gap-6">
      <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider text-glow" style={{ fontFamily: "'Noto Serif', serif" }}>
        Tu Tiên Giả Lập Ký
      </h1>
      <nav className="panel flex items-center justify-center gap-2 md:gap-4 p-2 w-full max-w-lg">
        <NavItem icon="bxs-user-circle" label="Nhân Vật" active />
        <NavItem icon="bxs-magic-wand" label="Kỹ Năng" />
        <NavItem icon="bxs-shopping-bag" label="Túi Đồ" />
        <NavItem icon="bxs-map" label="Bản Đồ" />
        <NavItem icon="bxs-grid-alt" label="Mở Rộng" />
      </nav>
    </header>
  );
};

export default Header;
