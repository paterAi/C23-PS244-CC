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
    const updatePromises = []

    snapshot.forEach(async (doc) => {
      const docRef = db.collection('users').doc(doc.id)

      // Mendapatkan nilai sebelum pembaruan
      const oldData = doc.data()

      if (!oldData.gender) {
        updatePromises.push(docRef.update({ gender: newGender }))
        profileUpdated = true
      } else if (!oldData.birthDate) {
        updatePromises.push(docRef.update({ birthDate: newBirthDate }))
        profileUpdated = true
      } else if (!oldData.bio) {
        updatePromises.push(docRef.update({ bio: newBio }))
        profileUpdated = true
      }

      updatePromises.push(
        docRef.update({
          username: newUsername,
          email: newEmail,
          bio: newBio,
          gender: newGender,
          birthDate: newBirthDate
        })
      )

      // Mendapatkan nilai setelah pembaruan
      const updatedData = {
        ...oldData,
        username: newUsername,
        email: newEmail,
        bio: newBio,
        gender: newGender,
        birthDate: newBirthDate
      }

      console.log('Data Sebelum Pembaruan:', oldData)
      console.log('Data Setelah Pembaruan:', updatedData)
    })

    await Promise.all(updatePromises)

    if (profileUpdated) {
      res.status(200).json({ message: 'Profil berhasil diperbarui' })
    } else {
      res.status(200).json({ message: 'Tidak ada pembaruan profil yang dilakukan' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui profil pengguna' })
  }
})

module.exports = router
