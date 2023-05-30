const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verifikasi token JWT
const verifyToken = (req, res, next) => {
    try {
        const authHeaders = req.cookies.token;
        console.log(req.cookies.token)
        console.log("======================")
        console.log(authHeaders.split('.')[1])
        console.log("======================")
        console.log(process.env.JWT_SECRET_KEY)
        // Periksa apakah token ada 
        if (!authHeaders) {
            return res.status(401).json({ error: 'Unauthorized: Token tidak ada' });
        } 

        // Verifikasi token menggunakan JWT_SECRET_KEY yang ada di .env
        const token = authHeaders.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error(err);
                // handle error
            } else {
                console.log(decoded);
                req.user = verified;
                next();
                // token valid, `decoded` berisi data yang ditanamkan saat pembuatan token
            }
        });
        // Mendapatkan data pengguna dari Firestore
        const userRef = admin.firestore().collection('users').doc(decodedToken.uid);
        userRef.get().then((doc) => {
            if (!doc.exists) {
                return res.status(401).json({ error: 'Data Tidak Ada' });
            }

            // Tambahkan data pengguna ke req.user
            req.user = doc.data();
            next();
        });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sepertinya ada yang salah' });
  }
};

module.exports = { verifyToken };
