const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// Verifikasi token JWT
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
    
        // Periksa apakah token ada
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Verifikasi token menggunakan JWT_SECRET_KEY yang ada di .env
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Mendapatkan data pengguna dari Firestore
        const userRef = admin.firestore().collection('users').doc(decodedToken.uid);
        userRef.get().then((doc) => {
            if (!doc.exists) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // Tambahkan data pengguna ke req.user
            req.user = doc.data();
            next();
        });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { verifyToken };
