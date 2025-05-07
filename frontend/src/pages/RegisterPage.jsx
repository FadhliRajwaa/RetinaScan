import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { register } from '../services/authService';

// Animation variants for the card
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1], // Custom cubic bezier for springy effect
      delay: 0.2,
    },
  },
};

// Animation variants for form elements
const formElementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for smooth entrance
      delay: 0.3 + i * 0.1,
    },
  }),
};

// Animation variants for error/success messages
const messageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
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
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Animation variants for button
const buttonVariants = {
  initial: {
    backgroundColor: '#2563EB', // blue-600
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
    backgroundColor: '#1D4ED8', // blue-700
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
    transition: { duration: 0.15 },
  },
  loading: {
    scale: 1,
    backgroundColor: '#9CA3AF', // gray-400
    transition: { duration: 0.2 },
  },
};

// Animation variants for input fields
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

// Animation variants for heading
const headingVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: 'easeOut',
    },
  },
};

// Animation variants for link
const linkVariants = {
  hover: {
    color: '#1E40AF', // blue-800
    transition: { duration: 0.2 },
  },
};

// Animation for the line under the link
const linkUnderlineVariants = {
  hidden: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      await register({ name, email, password });
      setSuccess('Registrasi berhasil! Anda akan dialihkan ke halaman login.');
      setTimeout(() => {
        navigate('/login');
      }, 1500); // Delay to show success message
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Email mungkin sudah digunakan.');
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
        className="w-full max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/50"
      >
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Daftar ke RetinaScan
        </motion.h2>

        {(error || success) && (
          <motion.p
            key={error || success} // Force re-render for exit animation
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`text-center mb-6 p-3 rounded-lg border ${
              error ? 'text-red-500 bg-red-50 border-red-100/50' : 'text-green-600 bg-green-50 border-green-100/50'
            }`}
          >
            {error || success}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            variants={formElementVariants}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <motion.input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variants={inputVariants}
              animate={focusedInput === 'name' ? 'focus' : 'blur'}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-50/50 transition duration-200"
              placeholder="Masukkan nama Anda"
              required
            />
          </motion.div>

          <motion.div
            variants={formElementVariants}
            custom={1}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-50/50 transition duration-200"
              placeholder="Masukkan email Anda"
              required
            />
          </motion.div>

          <motion.div
            variants={formElementVariants}
            custom={2}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-50/50 transition duration-200"
              placeholder="Masukkan kata sandi"
              required
            />
          </motion.div>

          <motion.div
            variants={formElementVariants}
            custom={3}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={isLoading ? 'loading' : undefined}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-200"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                'Daftar'
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.p
          variants={formElementVariants}
          custom={4}
          initial="hidden"
          animate="visible"
          className="mt-6 text-center text-gray-600"
        >
          Sudah punya akun?{' '}
          <motion.span className="inline-block">
            <Link
              to="/login"
              className="text-blue-600 font-medium relative overflow-hidden"
            >
              <motion.span
                variants={linkVariants}
                whileHover="hover"
              >
                Masuk
              </motion.span>
              <motion.span
                variants={linkUnderlineVariants}
                initial="hidden"
                whileHover="hover"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 origin-left"
              />
            </Link>
          </motion.span>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default RegisterPage;