import Header from '../components/common/Header';
import { motion } from 'framer-motion';

function Dashboard() {
  return (
    <div className="p-6">
      <Header title="Dashboard" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Unggah Citra</h3>
          <p className="text-gray-600">Unggah citra fundus retina dengan aman.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Analisis AI</h3>
          <p className="text-gray-600">Dapatkan prediksi keparahan instan.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Laporan Hasil</h3>
          <p className="text-gray-600">Lihat laporan deteksi yang jelas.</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;