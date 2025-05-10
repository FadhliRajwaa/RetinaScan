import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token } = await login({ email, password });
      // Simpan token di localStorage
      localStorage.setItem('token', token);
      // Arahkan ke dashboard dengan token sebagai query parameter
      window.location.href = `http://localhost:3000?token=${token}`;
    } catch (err) {
      setError('Email atau kata sandi salah.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-300 animate-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Masuk ke RetinaScan</h2>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-50 p-3 rounded-lg animate-pulse">
            {error}
          </p>
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
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              placeholder="Masukkan kata sandi"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
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
          </button>
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
      </div>
    </div>
  );
}

export default LoginPage;