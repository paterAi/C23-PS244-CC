const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config');

router.post('/', async (req, res) => {
  try {
    const { username, email, password, confirmPass } = req.body;

    // Tambahkan logika validasi email dan password sesuai kebutuhan
    if (password != confirmPass) return res.status(400).json({ msg: "Password tidak sama"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('email', '==', email).get();
    if (!querySnapshot.empty) {
      res.status(409).json({ error: 'Email sudah digunakan' });
    } else {
      await usersRef.add({
        username: username,
        email: email,
        password: hashPassword
        // Tambahkan informasi pengguna lainnya jika diperlukan
      });
      res.status(200).json({ message: 'Akun berhasil dibuat' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat akun' });
  }
});

module.exports = router;
