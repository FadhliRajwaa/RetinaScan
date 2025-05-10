import User from '../models/User.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const { fullName, dateOfBirth, gender, phone, address } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });

    user.fullName = fullName || user.fullName;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.gender = gender || user.gender;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();
    res.json({ message: 'Profil berhasil diperbarui', user });
  } catch (error) {
    next(error);
  }
};