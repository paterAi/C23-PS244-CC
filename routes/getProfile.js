const express = require('express');
const router = express.Router();
const db = require('../config');
const { verifyToken } = require('../middleware/verifyToken');

// Endpoint untuk mendapatkan profil pengguna
router.get('/', verifyToken, async (req, res) => {
  try {
    // Mendapatkan ID pengguna dari middleware verifyToken
    const userId = req.user.uid;

    // Mengambil data profil pengguna dari Firestore
    const profileRef = db.collection('users').doc(userId);
    const profileDoc = await profileRef.get();
    if (!profileDoc.exists) {
      return res.status(404).json({ error: 'Profile Tidak ada' });
    }

    const profileData = profileDoc.data();
    res.status(200).json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sepertinya ada yang salah' });
  }
});

module.exports = router;
