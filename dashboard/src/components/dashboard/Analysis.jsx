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
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
    >
      <h3 className="text-xl font-semibold mb-4">Analisis AI</h3>
      {error && (
        <p className="text-red-500 bg-red-50 p-3 rounded mb-4">{error}</p>
      )}
      {analysis ? (
        <div className="space-y-4">
          <p><strong>Tingkat Keparahan:</strong> {analysis.severity}</p>
          <p><strong>Keyakinan:</strong> {(analysis.confidence * 100).toFixed(2)}%</p>
        </div>
      ) : (
        <p className="text-gray-600">Klik untuk memulai analisis terbaru.</p>
      )}
      <button
        onClick={handleAnalyze}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4"
      >
        Jalankan Analisis
      </button>
    </motion.div>
  );
}

export default Analysis;