const express = require('express');
const router = express.Router();
const db = require('../config');
const { verifyToken } = require('../middleware/verifyToken');

// Endpoint untuk mengupdate profil pengguna
router.put('/', verifyToken, async (req, res) => {
  try {
    // Mendapatkan ID pengguna dari middleware verifyToken
    const userId = req.user.uid;

    // Memperbarui data profil pengguna di Firestore
    const { name, age, bio } = req.body;
    const profileRef = db.collection('profiles').doc(userId);
    await profileRef.set({ name, age, bio }, { merge: true });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
