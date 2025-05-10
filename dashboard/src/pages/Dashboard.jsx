import Header from '../components/common/Header';
import { motion } from 'framer-motion';

function Dashboard({ toggleMobileMenu, isMobileMenuOpen }) {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <Header 
        title="Dashboard" 
        toggleMobileMenu={toggleMobileMenu} 
        isMobileMenuOpen={isMobileMenuOpen} 
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h3 className="text-base sm:text-lg font-semibold">Unggah Citra</h3>
          <p className="text-gray-600 text-sm sm:text-base">Unggah citra fundus retina dengan aman.</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h3 className="text-base sm:text-lg font-semibold">Analisis AI</h3>
          <p className="text-gray-600 text-sm sm:text-base">Dapatkan prediksi keparahan instan.</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h3 className="text-base sm:text-lg font-semibold">Laporan Hasil</h3>
          <p className="text-gray-600 text-sm sm:text-base">Lihat laporan deteksi yang jelas.</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;