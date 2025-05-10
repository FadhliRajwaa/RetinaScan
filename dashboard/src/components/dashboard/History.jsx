import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getHistory } from '../../services/api';

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (err) {
        setError('Gagal memuat riwayat.');
      }
    };
    fetchHistory();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4">Riwayat Analisis</h3>
      {error && (
        <p className="text-red-500 bg-red-50 p-3 rounded mb-4">{error}</p>
      )}
      {history.length === 0 ? (
        <p className="text-gray-600">Belum ada riwayat analisis.</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg">
              <p><strong>Tanggal:</strong> {new Date(item.date).toLocaleDateString()}</p>
              <p><strong>Keparahan:</strong> {item.severity}</p>
              <p><strong>Keyakinan:</strong> {(item.confidence * 100).toFixed(2)}%</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default History;