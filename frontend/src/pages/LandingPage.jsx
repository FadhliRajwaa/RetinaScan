import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="fade-in">
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Deteksi Dini Retinopati Diabetik</h1>
          <p className="text-lg md:text-xl mb-8">Gunakan RetinaScan untuk menganalisis citra fundus retina dengan teknologi AI canggih.</p>
          <Link
            to="/register"
            className="inline-block bg-secondary text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition"
          >
            Mulai Sekarang
          </Link>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Unggah Citra</h3>
              <p>Unggah citra fundus retina dengan mudah dan aman.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Analisis AI</h3>
              <p>Dapatkan prediksi tingkat keparahan retinopati secara instan.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Laporan Hasil</h3>
              <p>Lihat laporan deteksi dalam antarmuka yang jelas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;