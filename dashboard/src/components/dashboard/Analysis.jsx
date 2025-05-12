import { useState } from 'react';
import { motion } from 'framer-motion';
import { getLatestAnalysis } from '../../services/api';

function Analysis() {
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    try {
      const data = await getLatestAnalysis();
      setAnalysis(data);
      setError('');
    } catch (err) {
      setError('Gagal mendapatkan hasil analisis.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg mx-auto"
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Analisis AI</h3>
      {error && (
        <p className="text-red-500 bg-red-50 p-2 sm:p-3 rounded mb-3 sm:mb-4 text-sm sm:text-base">{error}</p>
      )}
      {analysis ? (
        <div className="space-y-2 sm:space-y-4 text-sm sm:text-base">
          <p><strong>Tingkat Keparahan:</strong> {analysis.severity}</p>
          <p><strong>Keyakinan:</strong> {(analysis.confidence * 100).toFixed(2)}%</p>
        </div>
      ) : (
        <p className="text-gray-600 text-sm sm:text-base">Klik untuk memulai analisis terbaru.</p>
      )}
      <button
        onClick={handleAnalyze}
        className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors mt-3 sm:mt-4 text-sm sm:text-base"
      >
        Jalankan Analisis
      </button>
    </motion.div>
  );
}

export default Analysis;