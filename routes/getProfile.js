const express = require('express');
const router = express.Router();
const db = require('../config');
const { verifyToken } = require('../middleware/verifyToken');

// Endpoint untuk mendapatkan profil pengguna
router.get('/', verifyToken, async (req, res) => {
  try {
    // Mendapatkan ID pengguna dari middleware verifyToken
    const emailId = req.email;

    // Mengambil data profil pengguna dari Firestore
    const usersRef = db.collection('users');
    const query = usersRef.where('email', '==', emailId);
    const snapshot = await query.get();

    if (snapshot.empty) {
      res.status(404).json({ error: 'Profil pengguna tidak ditemukan' });
      return;
    }

    // Loop melalui setiap dokumen hasil query
    snapshot.forEach((doc) => {
      const userData = doc.data();
      const { email, username } = userData;
      const  profileData = { email, username };
      console.log(profileData);
      res.status(200).json(profileData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sepertinya ada yang salah' });
  }
});

module.exports = router;