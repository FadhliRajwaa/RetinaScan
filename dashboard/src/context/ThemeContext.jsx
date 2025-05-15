import { createContext, useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Theme Context
export const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState({
    primary: '#3B82F6', // Blue-600
    secondary: '#10B981', // Green-500
    accent: '#8B5CF6', // Violet-500
    background: '#F9FAFB', // gray-50
    text: '#1F2937', // gray-800
  });

  // Deteksi perangkat mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isMobile }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook untuk menggunakan theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// HOC untuk mendukung animasi page transition
export const withPageTransition = (Component) => {
  return (props) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut" 
        }}
        style={{ 
          willChange: 'opacity',
          transform: 'translateZ(0)'
        }}
      >
        <Component {...props} />
      </motion.div>
    );
  };
};

// Animasi untuk komponen yang umum digunakan (Optimized for performance)
export const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, // Reduced from 0.1
        duration: 0.2, // Reduced from 0.3
      } 
    },
  },
  item: {
    hidden: { y: 10, opacity: 0 }, // Reduced y distance
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'tween', // Changed from spring for better performance
        duration: 0.2,
        ease: 'easeOut'
      }
    },
  },
  card: {
    initial: { scale: 0.97, opacity: 0 }, // Smaller scale change
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.02, y: -3, boxShadow: '0 10px 15px -5px rgba(0, 0, 0, 0.1)' }, // Reduced scale and y values
    tap: { scale: 0.98 },
  },
  button: {
    hover: { scale: 1.03, transition: { duration: 0.15 } }, // Reduced scale and duration
    tap: { scale: 0.97, transition: { duration: 0.1 } }, // Reduced scale change
  },
  dropdown: {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.2 } }, // Reduced duration
  }
}; 