const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');
const functions = require("firebase-functions")

// Inisialisasi aplikasi Express
const app = express();

// Konfigurasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware untuk memproses body permintaan dalam format JSON
app.use(express.json());

// Handler untuk rute pencarian
app.get('/cari', (req, res) => {
  const keyword = req.query.keyword;

  // Validasi parameter query
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  // Membuat kueri pencarian di Firestore
  const collectionRef = admin.firestore().collection('sayur').doc(keyword)
  collectionRef.get().then(snapshot => res.json(snapshot.data()))

  
});

// Menjalankan server pada port tertentu
const port = 1000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

exports.api = functions.region("asia-southeast2").https.onRequest(app);