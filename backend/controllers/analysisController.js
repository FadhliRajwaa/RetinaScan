import crypto from 'crypto';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Tidak ada file yang diunggah' });
    const mockPrediction = {
      severity: 'Ringan',
      confidence: 0.85,
    };
    res.json({ message: 'Analisis berhasil', prediction: mockPrediction });
  } catch (error) {
    next(error);
  }
};