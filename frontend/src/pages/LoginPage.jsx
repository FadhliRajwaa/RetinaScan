import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { login } from '../services/authService';
import { HomeIcon, ArrowLeftOnRectangleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle show/hide password
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.get('http://localhost:5000/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { token } = await login({ email, password });
      localStorage.setItem('token', token);
      window.location.href = `http://localhost:3000?token=${token}`;
    } catch (err) {
      setError('Email atau kata sandi salah.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/50"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Anda Sudah Login</h2>
          <p className="text-center text-gray-600 mb-6">Silakan kembali ke beranda atau logout untuk masuk dengan akun lain.</p>
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center justify-center w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Kembali ke Beranda
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/50"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Masuk ke RetinaScan</h2>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center mb-4 bg-red-50 p-3 rounded-lg"
          >
            {error}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              placeholder="Masukkan email Anda"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-10"
                required
                placeholder="Masukkan kata sandi"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              'Masuk'
            )}
          </motion.button>
        </form>
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600">
            Lupa kata sandi?{' '}
            <Link to="/forgot-password" className="text-blue-600 hover:underline font-medium transition-colors duration-200">
              Pulihkan
            </Link>
          </p>
          <p className="text-gray-600">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium transition-colors duration-200">
              Daftar
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;