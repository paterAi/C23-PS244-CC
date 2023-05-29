const express = require('express');
const router = express.Router();
const db = require('../config');

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tambahkan logika validasi email dan password sesuai kebutuhan

    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('email', '==', email).get();

    if (querySnapshot.empty) {
      res.status(404).json({ error: 'Akun tidak ditemukan' });
    } else {
      const user = querySnapshot.docs[0].data();

      if (user.password === password) {
        // Generate JWT token
        // Contoh menggunakan library 'jsonwebtoken'
        const jwt = require('jsonwebtoken');
        const secretKey = 'your-secret-key'; // Ganti dengan kunci rahasia Anda

        const token = jwt.sign({ email: user.email }, secretKey);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Password yang dimasukkan salah' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat masuk' });
  }
});

module.exports = router;
