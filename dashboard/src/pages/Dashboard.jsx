import Header from '../components/common/Header';
import { motion } from 'framer-motion';
import {
  ArrowUpTrayIcon, // Ganti UploadIcon
  ChartBarIcon,
  DocumentChartBarIcon, // Ganti DocumentReportIcon
  ClockIcon,
} from '@heroicons/react/24/outline'; // Perbarui ke v2

const features = [
  {
    title: 'Unggah Citra',
    description: 'Unggah citra fundus retina dengan aman dan mudah.',
    icon: ArrowUpTrayIcon, // Update ikon
    path: '/upload',
  },
  {
    title: 'Analisis AI',
    description: 'Dapatkan prediksi tingkat keparahan secara instan.',
    icon: ChartBarIcon,
    path: '/analysis',
  },
  {
    title: 'Laporan Hasil',
    description: 'Lihat laporan deteksi dalam format yang jelas.',
    icon: DocumentChartBarIcon, // Update ikon
    path: '/report',
  },
  {
    title: 'Riwayat Analisis',
    description: 'Tinjau semua analisis sebelumnya dengan detail.',
    icon: ClockIcon,
    path: '/history',
  },
];

function Dashboard({ toggleMobileMenu, isMobileMenuOpen }) {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-100">
      <Header
        title="Dashboard"
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Selamat Datang di RetinaScan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.a
              key={feature.title}
              href={feature.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
              className="bg-white p-6 rounded-xl shadow-lg hover:bg-blue-50 transition-all duration-300 flex flex-col items-center text-center"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;