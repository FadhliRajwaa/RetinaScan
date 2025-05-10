import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const uploadImage = async (formData) => {
  const response = await axios.post(`${API_URL}/analysis/upload`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getHistory = async () => {
  // Endpoint ini belum ada di backend, gunakan mock untuk saat ini
  return [
    { id: 1, date: '2025-05-01', severity: 'Ringan', confidence: 0.85 },
    { id: 2, date: '2025-05-02', severity: 'Sedang', confidence: 0.78 },
  ];
};

export const getLatestAnalysis = async () => {
  // Endpoint ini belum ada, gunakan mock
  return {
    severity: 'Ringan',
    confidence: 0.85,
  };
};

export const getReport = async () => {
  // Endpoint ini belum ada, gunakan mock
  return {
    date: '2025-05-01',
    details: 'Analisis menunjukkan tanda-tanda awal retinopati.',
    recommendations: 'Konsultasi dengan dokter mata disarankan.',
  };
};