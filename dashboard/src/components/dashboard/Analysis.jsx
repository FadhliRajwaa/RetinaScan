import { useState } from 'react';
import { motion } from 'framer-motion';
import { getLatestAnalysis } from '../../services/api';

function Analysis() {
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setIsLoading(true);
      const data = await getLatestAnalysis();
      setAnalysis(data);
      setError('');
    } catch (err) {
      setError('Gagal mendapatkan hasil analisis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6">
          Analisis AI
        </h3>
        
        {error && (
          <p className="text-red-500 bg-red-50 p-2 sm:p-3 rounded mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base">
            {error}
          </p>
        )}
        
        <div className="flex-grow">
          {analysis ? (
            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                <p className="font-medium text-sm sm:text-base lg:text-lg min-w-[120px] sm:min-w-[140px]">
                  Tingkat Keparahan:
                </p>
                <p className="text-sm sm:text-base lg:text-lg flex-grow">
                  {analysis.severity}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                <p className="font-medium text-sm sm:text-base lg:text-lg min-w-[120px] sm:min-w-[140px]">
                  Keyakinan:
                </p>
                <p className="text-sm sm:text-base lg:text-lg flex-grow">
                  {(analysis.confidence * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg py-2 sm:py-4">
              Klik untuk memulai analisis terbaru.
            </p>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className={`w-full ${
            isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-2 sm:py-3 lg:py-3 rounded-lg transition-colors mt-3 sm:mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg flex items-center justify-center`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </>
          ) : (
            'Jalankan Analisis'
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default Analysis;