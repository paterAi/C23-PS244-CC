const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const db = require('../config');

router.put('/update', verifyToken, async (req, res) => {
  try {
    const { email, newEmail, newUsername, newBio, newGender, newBirthDate } = req.body;

    const usersRef = db.collection('users');
    const query = usersRef.where('email', '==', req.body.email);
    const snapshot = await query.get();

    // Perbarui data profil pengguna di Firestore
    snapshot.forEach(async (doc) => {
      const docRef = db.collection('users').doc(doc.id);

      // Tambahkan field gender, birthDate, bio jika belum ada
      if (!doc.data().gender) {
        await docRef.update({ gender : newGender });
      } else if (!doc.data().birthDate) {
        await docRef.update({ birthDate : newBirthDate });
      } else if (!doc.data().bio) {
        await docRef.update({ bio : newBio });
      }

      await docRef.update({
        username : newUsername,
        email : newEmail,
      });

      res.status(200).json({ message: 'Profil berhasil diperbarui' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui profil pengguna' });
  }
});

module.exports = router;
