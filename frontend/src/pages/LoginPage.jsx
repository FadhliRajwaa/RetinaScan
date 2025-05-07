import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { login } from '../services/authService';

// Animation variants for the container card
const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth entrance
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

// Animation variants for heading
const headingVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeOut",
    },
  },
};

// Animation variants for form elements
const formElementVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2 + i * 0.1,
    },
  }),
};

// Animation variants for error message
const errorVariants = {
  hidden: { opacity: 0, scale: 0.8, height: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    height: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Animation variants for button
const buttonVariants = {
  initial: {
    boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)',
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
    backgroundImage: 'linear-gradient(to right, #1D4ED8, #2563EB)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.97,
    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.3)',
    transition: { 
      duration: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  loading: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Animation for input fields
const inputVariants = {
  focus: {
    scale: 1.01,
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
    borderColor: '#3B82F6',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  blur: {
    scale: 1,
    boxShadow: 'none',
    borderColor: '#D1D5DB',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// Link hover animation
const linkHoverVariants = {
  hover: {
    color: '#1E40AF', // blue-800
    transition: { duration: 0.2 },
  }
};

// Underline animation for links
const underlineVariants = {
  hidden: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

// Loading spinner animation
const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity
    }
  }
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login({ email, password });
      setLoginSuccess(true);
      
      // Delay navigation for the success animation to show
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError('Email atau kata sandi salah.');
      setLoginSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 px-4 py-8">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/50"
      >
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold text-center mb-6 text-gray-800 bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500"
        >
          Masuk ke RetinaScan
        </motion.h2>
        
        <AnimatePresence>
          {error && (
            <motion.div
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-red-500 text-center mb-4 bg-red-50 p-3 rounded-lg border border-red-100/50 overflow-hidden"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            variants={formElementVariants}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <motion.input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variants={inputVariants}
              animate={focusedInput === 'email' ? 'focus' : 'blur'}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-50/50 transition-all duration-200"
              required
              placeholder="Masukkan email Anda"
            />
          </motion.div>
          
          <motion.div
            variants={formElementVariants}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Kata Sandi
            </label>
            <motion.input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variants={inputVariants}
              animate={focusedInput === 'password' ? 'focus' : 'blur'}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-50/50 transition-all duration-200"
              required
              placeholder="Masukkan kata sandi"
            />
          </motion.div>
          
          <motion.div
            variants={formElementVariants}
            custom={2}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              type="submit"
              disabled={isLoading || loginSuccess}
              variants={buttonVariants}
              initial="initial"
              whileHover={isLoading || loginSuccess ? {} : "hover"}
              whileTap={isLoading || loginSuccess ? {} : "tap"}
              animate={isLoading ? "loading" : loginSuccess ? "success" : "initial"}
              className={`w-full py-3 rounded-lg text-white font-semibold ${
                loginSuccess 
                  ? 'bg-green-500' 
                  : isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <motion.svg 
                    variants={spinnerVariants}
                    animate="animate"
                    className="h-5 w-5 mr-2 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </motion.svg>
                  Memproses...
                </span>
              ) : loginSuccess ? (
                <span className="flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Berhasil!
                </span>
              ) : (
                'Masuk'
              )}
            </motion.button>
          </motion.div>
        </form>
        
        <motion.div
          variants={formElementVariants}
          custom={3}
          initial="hidden"
          animate="visible"
          className="mt-6 text-center space-y-2"
        >
          <p className="text-gray-600">
            Lupa kata sandi?{' '}
            <motion.span className="inline-block">
              <Link to="/forgot-password" className="text-blue-600 font-medium relative overflow-hidden">
                <motion.span
                  variants={linkHoverVariants}
                  whileHover="hover"
                >
                  Pulihkan
                </motion.span>
                <motion.span
                  variants={underlineVariants}
                  initial="hidden"
                  whileHover="hover"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 origin-left"
                />
              </Link>
            </motion.span>
          </p>
          <p className="text-gray-600">
            Belum punya akun?{' '}
            <motion.span className="inline-block">
              <Link to="/register" className="text-blue-600 font-medium relative overflow-hidden">
                <motion.span
                  variants={linkHoverVariants}
                  whileHover="hover"
                >
                  Daftar
                </motion.span>
                <motion.span
                  variants={underlineVariants}
                  initial="hidden"
                  whileHover="hover"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 origin-left"
                />
              </Link>
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginPage;