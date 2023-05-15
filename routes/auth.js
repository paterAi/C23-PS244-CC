const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/User');

// Rute signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Periksa apakah pengguna sudah ada
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Enkripsi kata sandi
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Signup failed' });
  }
});

// Rute login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Temukan pengguna berdasarkan nama pengguna
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Periksa kecocokan kata sandi
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
