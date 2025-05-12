import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import UploadImagePage from './pages/UploadImagePage';
import HistoryPage from './pages/HistoryPage';
import AnalysisPage from './pages/AnalysisPage';
import ReportPage from './pages/ReportPage';
import Sidebar from './components/common/Sidebar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const query = new URLSearchParams(location.search);
      let token = query.get('token') || localStorage.getItem('token');

      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            localStorage.setItem('token', token);
            setIsAuthenticated(true);

            const response = await axios.get('http://localhost:5000/api/user/profile', {
              headers: { Authorization: `Bearer ${token}` },
            });
            const user = response.data;
            if (user.fullName && user.dateOfBirth && user.gender && user.phone && user.address) {
              setIsProfileComplete(true);
            }
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auth error:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isAuthenticated && <Sidebar toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />}
      <div className="flex-1 overflow-x-hidden">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                isProfileComplete ? (
                  <Dashboard toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
                ) : (
                  <Navigate to="/profile" />
                )
              ) : (
                <Navigate to="http://localhost:5173/login" />
              )
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload" element={<UploadImagePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;