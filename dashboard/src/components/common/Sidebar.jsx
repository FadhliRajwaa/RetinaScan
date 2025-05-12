import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  UserIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  ClockIcon,
  ArrowLeftOnRectangleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: HomeIcon },
  { name: 'Profile', path: '/profile', icon: UserIcon },
  { name: 'Upload Citra', path: '/upload', icon: ArrowUpTrayIcon },
  { name: 'Analisis AI', path: '/analysis', icon: ChartBarIcon },
  { name: 'Laporan Hasil', path: '/report', icon: DocumentChartBarIcon },
  { name: 'History', path: '/history', icon: ClockIcon },
  { 
    name: 'Kembali ke Beranda', 
    path: 'http://localhost:5173',
    icon: ArrowLeftCircleIcon,
    external: true
  },
];

function Sidebar({ toggleMobileMenu, isMobileMenuOpen }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const handleLogout = () => {
    console.log('Logging out from dashboard'); // Debugging
    localStorage.removeItem('token');
    console.log('Token after removal:', localStorage.getItem('token')); // Debugging
    window.location.href = 'http://localhost:5173?logout=true'; // Redirect ke beranda dengan parameter logout
  };

  const sidebarVariants = {
    open: { width: '260px', transition: { duration: 0.3, ease: 'easeInOut' } },
    closed: { width: '80px', transition: { duration: 0.3, ease: 'easeInOut' } },
    mobileOpen: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
    mobileClosed: { x: '-100%', opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: i * 0.1, ease: 'easeOut' },
    }),
  };

  return (
    <>
      {/* Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="mobileClosed"
        animate={isMobileMenuOpen ? 'mobileOpen' : 'mobileClosed'}
        className="lg:hidden fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white w-64 z-50 shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header: Logo and Close Button */}
          <div className="p-4 pt-6 flex items-center justify-between bg-blue-900/50">
            <h1 className="text-2xl font-extrabold tracking-tight">RetinaScan</h1>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Scrollable Navigation */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-900/50 p-4 scroll-smooth">
            <AnimatePresence>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {item.external ? (
                    <a
                      href={item.path}
                      onClick={toggleMobileMenu}
                      className={`flex items-center p-4 mb-2 rounded-lg transition-all duration-200 ${
                        location.pathname === item.path ? 'bg-blue-800 shadow-inner' : 'hover:bg-blue-600'
                      }`}
                    >
                      <item.icon className="h-6 w-6 mr-3" />
                      <span className="text-base font-medium">{item.name}</span>
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={`flex items-center p-4 mb-2 rounded-lg transition-all duration-200 ${
                        location.pathname === item.path ? 'bg-blue-800 shadow-inner' : 'hover:bg-blue-600'
                      }`}
                    >
                      <item.icon className="h-6 w-6 mr-3" />
                      <span className="text-base font-medium">{item.name}</span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </nav>
          {/* Logout Button */}
          <div className="p-4 border-t border-blue-700/50">
            <button
              onClick={handleLogout}
              className="flex items-center p-4 w-full rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
              <span className="text-base font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Desktop/Tablet Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        className="hidden lg:block bg-gradient-to-b from-blue-700 to-blue-900 text-white h-screen sticky top-0 shadow-2xl"
      >
        <div className="p-4 flex justify-between items-center">
          {isOpen && <h1 className="text-2xl font-extrabold tracking-tight">RetinaScan</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-blue-600 transition-colors"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            item.external ? (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center p-4 mb-2 mx-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path ? 'bg-blue-800 shadow-inner' : 'hover:bg-blue-600'
                }`}
              >
                <item.icon className="h-6 w-6 mr-3" />
                {isOpen && <span className="text-base font-medium">{item.name}</span>}
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-4 mb-2 mx-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path ? 'bg-blue-800 shadow-inner' : 'hover:bg-blue-600'
                }`}
              >
                <item.icon className="h-6 w-6 mr-3" />
                {isOpen && <span className="text-base font-medium">{item.name}</span>}
              </Link>
            )
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className={`flex items-center p-4 mt-auto mx-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 ${
            isOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
          {isOpen && <span className="text-base font-medium">Logout</span>}
        </button>
      </motion.aside>
    </>
  );
}

export default Sidebar;