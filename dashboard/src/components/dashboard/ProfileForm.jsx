import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileForm({ onProfileComplete }) {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { fullName, dateOfBirth, gender, phone, address } = response.data;
        setFormData({
          fullName: fullName || '',
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : '',
          gender: gender || '',
          phone: phone || '',
          address: address || '',
        });
      } catch (err) {
        console.error('Gagal memuat profil:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/user/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Profil berhasil disimpan!');
      setError('');
      
      // Update profile complete status
      if (onProfileComplete) {
        onProfileComplete();
      }
      
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError('Gagal menyimpan profil.');
      setSuccess('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg max-w-md md:max-w-lg lg:max-w-2xl mx-2 sm:mx-auto"
    >
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">Lengkapi Profil Anda</h3>
      {error && (
        <p className="text-red-500 bg-red-50 p-2 sm:p-3 rounded mb-4 text-sm sm:text-base">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-600 bg-green-50 p-2 sm:p-3 rounded mb-4 text-sm sm:text-base">
          {success}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">
            Tanggal Lahir
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="mt-1 w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">
            Jenis Kelamin
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          >
            <option value="">Pilih</option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </div>
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">
            Nomor Telepon
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">
            Alamat
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base md:text-lg"
        >
          Simpan Profil
        </button>
      </form>
    </motion.div>
  );
}

export default ProfileForm;