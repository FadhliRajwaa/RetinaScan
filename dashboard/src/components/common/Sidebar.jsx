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

function Sidebar({ toggleMobileMenu, isMobileMenuOpen }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const sidebarVariants = {
    open: { 
      width: '250px',
      transition: { duration: 0.3 } 
    },
    closed: { 
      width: '80px',
      transition: { duration: 0.3 } 
    },
    mobileOpen: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    mobileClosed: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => toggleMobileMenu()}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="mobileClosed"
        animate={isMobileMenuOpen ? "mobileOpen" : "mobileClosed"}
        className="lg:hidden fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white w-64 z-40 shadow-xl"
      >
        <div className="p-4 pt-16">
          <h1 className="text-xl sm:text-2xl font-bold">RetinaScan</h1>
          <nav className="mt-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => toggleMobileMenu()}
                className={`flex items-center p-3 sm:p-4 hover:bg-blue-700 transition-colors rounded ${
                  location.pathname === item.path ? 'bg-blue-900' : ''
                }`}
              >
                <span className="text-xl mr-3 sm:mr-4">{item.icon}</span>
                <span className="text-sm sm:text-base">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* Desktop/Tablet Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        className="hidden lg:block bg-gradient-to-b from-blue-600 to-blue-800 text-white h-screen sticky top-0 shadow-xl"
      >
        <div className="p-3 sm:p-4 flex justify-between items-center">
          {isOpen && (
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">RetinaScan</h1>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 sm:p-2 rounded-full hover:bg-blue-700 transition-colors"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? '←' : '→'}
          </button>
        </div>
        <nav className="mt-4 sm:mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 sm:p-4 hover:bg-blue-700 transition-colors rounded ${
                location.pathname === item.path ? 'bg-blue-900' : ''
              }`}
            >
              <span className="text-lg sm:text-xl mr-3 sm:mr-4">{item.icon}</span>
              {isOpen && <span className="text-xs sm:text-sm md:text-base">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}

export default Sidebar;