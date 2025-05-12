import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const location = useLocation();

  const checkAuth = async (forceLogout = false) => {
    if (forceLogout) {
      console.log('Forcing logout due to query parameter'); // Debugging
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUserName('');
      setToken('');
      return;
    }

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setIsAuthenticated(true);
        setUserName(response.data.name || 'User');
        setToken(storedToken);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserName('');
        setToken('');
      }
    } else {
      setIsAuthenticated(false);
      setUserName('');
      setToken('');
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const logoutParam = query.get('logout');
    console.log('Query logout param:', logoutParam); // Debugging
    checkAuth(logoutParam === 'true');
  }, [location]);

  const handleLogout = () => {
    console.log('Logging out from frontend'); // Debugging
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserName('');
    setToken('');
    window.location.href = '/';
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold tracking-tight">RetinaScan</span>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {isAuthenticated ? (
              <>
                <a
                  href={`http://localhost:3000?token=${token}`}
                  className="px-4 py-2 text-sm font-bold rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  Dashboard
                </a>
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-blue-600 transition-all duration-200"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden bg-blue-800 rounded-b-lg">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <a
                  href={`http://localhost:3000?token=${token}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-base font-medium hover:bg-blue-600 rounded-lg"
                >
                  Dashboard
                </a>
                <div className="flex items-center px-4 py-2 text-base font-medium">
                  <UserCircleIcon className="h-6 w-6 mr-2" />
                  <span>{userName}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-base font-medium hover:bg-red-600 rounded-lg"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-base font-medium hover:bg-blue-600 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-base font-medium hover:bg-blue-600 rounded-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;