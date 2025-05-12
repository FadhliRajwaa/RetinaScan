import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getReport } from '../../services/api';

function Report() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReport();
        setReport(data);
      } catch (err) {
        setError('Gagal memuat laporan.');
      }
    };
    fetchReport();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg mx-2 sm:mx-0"
    >
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6">
        Laporan Hasil
      </h3>
      
      {error && (
        <p className="text-red-500 bg-red-50 p-2 sm:p-3 rounded mb-3 sm:mb-4 text-sm sm:text-base">
          {error}
        </p>
      )}
      
      {report ? (
        <div className="space-y-3 sm:space-y-4 lg:space-y-5">
          <p className="text-sm sm:text-base lg:text-lg">
            <strong className="font-medium block sm:inline-block sm:w-32">Laporan Terakhir:</strong> 
            <span className="block sm:inline mt-1 sm:mt-0">{new Date(report.date).toLocaleDateString()}</span>
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            <strong className="font-medium block sm:inline-block sm:w-32">Detail:</strong> 
            <span className="block sm:inline mt-1 sm:mt-0">{report.details}</span>
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            <strong className="font-medium block sm:inline-block sm:min-w-[8rem]">Rekomendasi:</strong> 
            <span className="block sm:inline mt-1 sm:mt-0">{report.recommendations}</span>
          </p>
        </div>
      ) : (
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
          Belum ada laporan tersedia.
        </p>
      )}
    </motion.div>
  );
}

export default Report;