const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const router = express.Router();
const db = require('../config');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tambahkan logika validasi email dan password sesuai kebutuhan

    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('email', '==', email).get();

    if (querySnapshot.empty) {
        res.status(404).json({ error: 'Akun tidak ditemukan' });
    } else {
        const match = await bcrypt.compare(req.body.password, querySnapshot.docs[0].data().password);
        if (!match) {
            res.status(401).json({ error: 'Password yang dimasukkan salah' });
        }
        const username = querySnapshot.docs[0].data().username;
        const email = querySnapshot.docs[0].data().email;

        const accessSecretKey = process.env.ACCESS_TOKEN_SECRET;
        const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;
        const accessToken = jwt.sign({ username, email }, accessSecretKey, { 
            expiresIn: "30s" });
        
        const refreshToken = jwt.sign({ username, email }, refreshSecretKey, { 
            expiresIn: "1d" });
        
        // buat update token
        await usersRef.doc(querySnapshot.docs[0].id).update({
            refreshToken: refreshToken
        });
        res.cookie('refreshToken', refreshToken, { 
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          //secure: true
        });
        res.json({ accessToken });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat masuk' });
  }
});

module.exports = router;
