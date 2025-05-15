import { Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import ScanRetinaPage from './pages/ScanRetinaPage';
import AnalysisPage from './pages/AnalysisPage';
import ReportPage from './pages/ReportPage';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [currentTitle, setCurrentTitle] = useState('Dashboard');

  // Update title based on current path
  useEffect(() => {
    const path = location.pathname;
    console.log('Current path:', path);
    
    if (path === '/' || path === '/dashboard') setCurrentTitle('Dashboard');
    else if (path === '/profile') setCurrentTitle('Profile');
    else if (path === '/scan-retina') setCurrentTitle('Scan Retina');
    else if (path === '/history') setCurrentTitle('History');
    else if (path === '/analysis') setCurrentTitle('Analysis');
    else if (path === '/report') setCurrentTitle('Report');
  }, [location.pathname]);

  // Handle token from URL query parameter
  useEffect(() => {
    const tokenFromURL = searchParams.get('token');
    if (tokenFromURL) {
      localStorage.setItem('token', tokenFromURL);
      // Remove token from URL for security
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams]);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return false;
    }
    
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        setLoading(false);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      setLoading(false);
      return false;
    }
  };

  // Check profile completion
  const checkProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      // Try get profile from the correct endpoint
      const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Check if profile has required fields
      console.log('Profile data:', response.data);
      if (response.data && response.data.fullName && response.data.dateOfBirth && response.data.gender) {
        console.log('Profile is complete');
        setIsProfileComplete(true);
      } else {
        console.log('Profile is incomplete');
        setIsProfileComplete(false);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error checking profile:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const authResult = checkAuth();
    setIsAuthenticated(authResult);
    
    if (authResult) {
      checkProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const toggleMobileMenu = () => {
    console.log('Toggling mobile menu, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const updateProfileStatus = () => {
    console.log('Updating profile status to complete');
    setIsProfileComplete(true);
  };

  // Logging profile status for debugging
  useEffect(() => {
    console.log('Profile complete status:', isProfileComplete);
  }, [isProfileComplete]);

  // Early return for loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = 'http://localhost:5173/login';
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      
      <main className="flex-1 p-0 lg:p-4 overflow-hidden transition-all duration-200" style={{ 
        marginLeft: isMobileMenuOpen ? '0' : '0',
        willChange: 'margin, padding',
      }}>
        {/* Global Header used in all pages */}
        <Header 
          title={currentTitle} 
          toggleMobileMenu={toggleMobileMenu} 
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={isProfileComplete ? <Dashboard /> : <Navigate to="/profile" />} />
            <Route path="/dashboard" element={isProfileComplete ? <Dashboard /> : <Navigate to="/profile" />} />
            <Route path="/profile" element={<ProfilePage updateProfileStatus={updateProfileStatus} />} />
            <Route path="/scan-retina" element={isProfileComplete ? <ScanRetinaPage /> : <Navigate to="/profile" />} />
            <Route path="/history" element={isProfileComplete ? <HistoryPage /> : <Navigate to="/profile" />} />
            <Route path="/analysis" element={isProfileComplete ? <AnalysisPage /> : <Navigate to="/profile" />} />
            <Route path="/report" element={isProfileComplete ? <ReportPage /> : <Navigate to="/profile" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;