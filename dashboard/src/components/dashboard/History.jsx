import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getHistory } from '../../services/api';

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const data = await getHistory();
        setHistory(data);
        setError('');
      } catch (err) {
        setError('Gagal memuat riwayat.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg mx-2 sm:mx-0 w-full max-w-4xl"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5 lg:mb-6">
          Riwayat Analisis
        </h3>
        
        {error && (
          <p className="text-red-500 bg-red-50 p-2 sm:p-3 rounded mb-4 text-xs sm:text-sm lg:text-base">
            {error}
          </p>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : history.length === 0 ? (
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg py-4 text-center">
            Belum ada riwayat analisis.
          </p>
        ) : (
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            {history.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className="border border-gray-200 p-3 sm:p-4 lg:p-5 rounded-lg hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">Tanggal</p>
                    <p className="text-sm sm:text-base lg:text-lg font-medium">
                      {new Date(item.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">Keparahan</p>
                    <p className="text-sm sm:text-base lg:text-lg font-medium">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.severity === 'Rendah' ? 'bg-green-100 text-green-800' :
                        item.severity === 'Sedang' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.severity}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">Keyakinan</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(item.confidence * 100).toFixed(0)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm sm:text-base lg:text-lg font-medium">
                        {(item.confidence * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default History;