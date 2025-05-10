import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ubah ke named import
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
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      // Ambil token dari query parameter atau localStorage
      const query = new URLSearchParams(location.search);
      let token = query.get('token') || localStorage.getItem('token');

      if (token) {
        try {
          // Verifikasi token
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            localStorage.setItem('token', token); // Simpan token
            setIsAuthenticated(true);

            // Periksa profil pengguna
            const response = await axios.get('http://localhost:5000/api/user/profile', {
              headers: { Authorization: `Bearer ${token}` },
            });
            const user = response.data;
            // Anggap profil lengkap jika semua field terisi
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isAuthenticated && <Sidebar />}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                isProfileComplete ? (
                  <Dashboard />
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