const express = require('express');
const router = express.Router();

// Data profil pengguna (Contoh data statis, Anda bisa mengganti dengan database)
let userProfile = {
  email: 'salmanwiharja8@gmail.com',
  nama: 'Salman Wiharja',
  username: 'salmanwiharja8',
  tanggalLahir: '2000-01-12',
  noHP: '085624772870',
  bio: 'Halo, saya adalah seorang pengguna.',
  jenisKelamin: 'Laki-laki'
};

// Mengambil profil pengguna
router.get('/', (req, res) => {
  res.json(userProfile);
});

// Mengupdate profil pengguna
router.put('/', (req, res) => {
  const updatedProfile = req.body;

  // Melakukan validasi data yang diupdate (misalnya: harus ada nama dan email)
  if (!updatedProfile.nama || !updatedProfile.email) {
    return res.status(400).json({ error: 'Nama dan Email harus diisi' });
  }

  // Melakukan update profil pengguna
  userProfile = { ...userProfile, ...updatedProfile };

  res.json({ message: 'Profil berhasil diperbarui', profile: userProfile });
});

module.exports = router;
