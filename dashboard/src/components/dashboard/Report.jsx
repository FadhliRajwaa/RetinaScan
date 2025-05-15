import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getReport } from '../../services/api';

function Report({ result }) {
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If result is provided, use it to create a report
    if (result) {
      // Mock report generation based on analysis result
      const generatedReport = {
        date: new Date().toISOString(),
        severity: result.severity,
        confidence: result.confidence,
        details: getDetailsFromSeverity(result.severity),
        recommendations: getRecommendationsFromSeverity(result.severity),
      };
      setReport(generatedReport);
    } else {
      // Otherwise fetch the latest report
      fetchReport();
    }
  }, [result]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const data = await getReport();
      setReport(data);
      setError('');
    } catch (err) {
      setError('Gagal memuat laporan.');
    } finally {
      setLoading(false);
    }
  };

  const getDetailsFromSeverity = (severity) => {
    switch (severity) {
      case 'Ringan':
        return 'Analisis menunjukkan tanda-tanda awal retinopati diabetik non-proliferatif ringan. Terdapat beberapa mikroaneurisma yang menunjukkan kebocoran kapiler retina di beberapa area.';
      case 'Sedang':
        return 'Analisis menunjukkan tanda-tanda retinopati diabetik non-proliferatif sedang. Terdapat perdarahan intraretinal dan eksudat keras yang menunjukkan penurunan fungsi barrier darah-retina.';
      case 'Berat':
        return 'Analisis menunjukkan tanda-tanda retinopati diabetik non-proliferatif berat. Terdapat banyak perdarahan retina, eksudat keras, dan cotton wool spots yang menandakan iskemia retina yang signifikan.';
      default:
        return 'Analisis tidak menunjukkan tanda-tanda retinopati diabetik yang signifikan. Retina tampak normal tanpa adanya anomali vaskular.';
    }
  };

  const getRecommendationsFromSeverity = (severity) => {
    switch (severity) {
      case 'Ringan':
        return 'Konsultasi dengan dokter mata dalam 6-12 bulan. Kontrol gula darah secara ketat dengan target HbA1c < 7%. Pantau tekanan darah dan kolesterol. Lakukan pemeriksaan fundus secara berkala.';
      case 'Sedang':
        return 'Konsultasi dengan dokter mata dalam 3-6 bulan. Kontrol gula darah secara ketat. Pertimbangkan pemeriksaan OCT untuk mengevaluasi ketebalan makula. Perhatikan perubahan penglihatan dan segera konsultasi jika ada perubahan.';
      case 'Berat':
        return 'Konsultasi dengan dokter mata spesialis retina segera (dalam 1 bulan). Kontrol gula darah secara ketat. Persiapkan kemungkinan tindakan laser panretinal photocoagulation (PRP) untuk mencegah neovaskularisasi.';
      default:
        return 'Lakukan pemeriksaan rutin dengan dokter mata setiap tahun. Jaga gula darah tetap terkontrol. Lakukan gaya hidup sehat dengan diet seimbang dan olahraga teratur.';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Ringan':
        return 'text-green-500 bg-green-50 border-green-200';
      case 'Sedang':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Berat':
        return 'text-red-500 bg-red-50 border-red-200';
      default:
        return 'text-blue-500 bg-blue-50 border-blue-200';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', damping: 12 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full mx-auto"
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 text-sm sm:text-base flex items-start"
          >
            <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {loading ? (
        <motion.div 
          className="flex justify-center py-8"
          variants={itemVariants}
        >
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      ) : report ? (
        <motion.div 
          className="space-y-6"
        >
          <motion.div 
            className="flex flex-col lg:flex-row gap-4"
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-1/3"
            >
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-xl shadow-sm border border-emerald-100">
                <h4 className="text-lg font-semibold text-emerald-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Diagnosa
                </h4>
                <motion.div 
                  className={`p-4 rounded-lg font-bold text-xl border ${getSeverityColor(report.severity)}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {report.severity || 'Normal'}
                </motion.div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Keyakinan AI:</span>
                    <span className="font-semibold">{((report.confidence || 0) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <motion.div 
                      className="bg-emerald-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(report.confidence || 0) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-emerald-100">
                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(report.date).toLocaleDateString('id-ID', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-2/3 space-y-4"
              variants={containerVariants}
            >
              <motion.div 
                variants={itemVariants}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Detail Analisis
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {report.details}
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Rekomendasi
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {report.recommendations}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="border-t border-gray-200 pt-5"
          >
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Catatan:</span> Hasil analisis ini hanya bersifat indikatif dan tidak menggantikan diagnosis dari dokter profesional. Segera konsultasikan dengan dokter spesialis mata untuk evaluasi lebih lanjut.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col items-center justify-center py-12 px-4"
        >
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-center max-w-md">
            Belum ada laporan tersedia. Silakan unggah gambar dan jalankan analisis AI untuk mendapatkan hasil dan rekomendasi.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Report;