const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/verifyToken')
const db = require('../config')

router.put('/update', verifyToken, async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { email, newEmail, newUsername, newBio, newGender, newBirthDate } = req.body

    const emailBody = req.body.email
    const usersRef = db.collection('users')
    const query = usersRef.where('email', '==', emailBody)
    const snapshot = await query.get()

    let profileUpdated = false

    // Perbarui data profil pengguna di Firestore
    snapshot.forEach(async (doc) => {
      const docRef = db.collection('users').doc(doc.id)

      // Tambahkan field gender, birthDate, bio jika belum ada
      if (!doc.data().gender) {
        await docRef.update({ gender: newGender })
        profileUpdated = true // Pembaruan profil berhasil
      } else if (!doc.data().birthDate) {
        await docRef.update({ birthDate: newBirthDate })
        profileUpdated = true // Pembaruan profil berhasil
      } else if (!doc.data().bio) {
        await docRef.update({ bio: newBio })
        profileUpdated = true // Pembaruan profil berhasil
      }

      await docRef.update({
        username: newUsername,
        email: newEmail
      })

      if (profileUpdated) {
        res.status(200).json({ message: 'Profil berhasil diperbarui' })
      } else {
        res.status(200).json({ message: 'Tidak ada pembaruan profil yang dilakukan' })
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui profil pengguna' })
  }
})

module.exports = router
