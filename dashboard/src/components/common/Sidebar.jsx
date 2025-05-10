import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: '🏠' },
  { name: 'Profile', path: '/profile', icon: '👤' },
  { name: 'Upload Citra', path: '/upload', icon: '📤' },
  { name: 'Analisis AI', path: '/analysis', icon: '🤖' },
  { name: 'Laporan Hasil', path: '/report', icon: '📊' },
  { name: 'History', path: '/history', icon: '📜' },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const sidebarVariants = {
    open: { width: '250px', transition: { duration: 0.3 } },
    closed: { width: '80px', transition: { duration: 0.3 } },
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={isOpen ? 'open' : 'closed'}
      className="bg-gradient-to-b from-blue-600 to-blue-800 text-white h-screen sticky top-0 shadow-xl"
    >
      <div className="p-4 flex justify-between items-center">
        {isOpen && (
          <h1 className="text-2xl font-bold">RetinaScan</h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-4 hover:bg-blue-700 transition-colors ${
              location.pathname === item.path ? 'bg-blue-900' : ''
            }`}
          >
            <span className="text-xl mr-4">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}

export default Sidebar;