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
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4">Laporan Hasil</h3>
      {error && (
        <p className="text-red-500 bg-red-50 p-3 rounded mb-4">{error}</p>
      )}
      {report ? (
        <div className="space-y-4">
          <p><strong>Laporan Terakhir:</strong> {new Date(report.date).toLocaleDateString()}</p>
          <p><strong>Detail:</strong> {report.details}</p>
          <p><strong>Rekomendasi:</strong> {report.recommendations}</p>
        </div>
      ) : (
        <p className="text-gray-600">Belum ada laporan tersedia.</p>
      )}
    </motion.div>
  );
}

export default Report;