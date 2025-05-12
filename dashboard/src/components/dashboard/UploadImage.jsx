import { useState } from 'react';
import { motion } from 'framer-motion';
import { uploadImage } from '../../services/api';

function UploadImage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError('');
      setSuccess('');
    } else {
      setError('Hanya file JPEG/PNG yang diizinkan (maks. 5MB).');
      setFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Pilih file terlebih dahulu.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Ukuran file terlalu besar (maks. 5MB).');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await uploadImage(formData);
      setSuccess(`Gambar berhasil diunggah! Hasil: ${response.prediction || 'Tidak ada prediksi'}`);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengunggah gambar. Coba lagi.');
      setSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto"
    >
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6">
        Unggah Citra Fundus
      </h3>
      
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 text-sm sm:text-base"
        >
          {error}
        </motion.div>
      )}
      
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-600 bg-green-50 p-3 rounded-lg mb-4 text-sm sm:text-base"
        >
          {success}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium text-gray-700">
            Pilih File Gambar
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                {file ? file.name : 'Seret atau klik untuk memilih gambar'}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Format: JPEG/PNG (maks. 5MB)
              </p>
            </div>
          </div>
        </div>

        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 sm:h-64 md:h-72 object-contain rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setFile(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              disabled={isLoading}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isLoading || !file}
          className={`w-full py-2 sm:py-3 rounded-lg text-white font-medium flex items-center justify-center ${
            isLoading
              ? 'bg-blue-400'
              : !file
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Mengunggah...
            </>
          ) : (
            'Unggah Citra'
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default UploadImage;