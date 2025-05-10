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
    } else {
      setError('Hanya file JPEG/PNG yang diizinkan.');
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
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await uploadImage(formData);
      setSuccess('Gambar berhasil diunggah! ' + JSON.stringify(response.prediction));
      setError('');
    } catch (err) {
      setError('Gagal mengunggah gambar.');
      setSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
    >
      <h3 className="text-xl font-semibold mb-4">Unggah Citra Fundus</h3>
      {error && (
        <p className="text-red-500 bg-red-50 p-3 rounded mb-4">{error}</p>
      )}
      {success && (
        <p className="text-green-600 bg-green-50 p-3 rounded mb-4">{success}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        {preview && (
          <img src={preview} alt="Preview" className="w-full h-64 object-contain rounded-lg mb-4" />
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg text-white ${
            isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {isLoading ? 'Mengunggah...' : 'Unggah Citra'}
        </button>
      </form>
    </motion.div>
  );
}

export default UploadImage;