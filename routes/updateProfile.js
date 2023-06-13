const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/verifyToken')
const db = require('../config')

router.put('/', verifyToken, async (req, res) => {
  try {
    const email = req.email
    const { newUsername, newBio, newGender, newBirthDate } = req.body

    const usersRef = db.collection('users')
    const query = usersRef.where('email', '==', email)
    const snapshot = await query.get()

    if (snapshot.empty) {
      res.status(404).json({ error: 'Akun tidak ada' })
      return
    }

    let profileUpdated = false
    const updatePromises = []

    snapshot.forEach((doc) => {
      const docRef = db.collection('users').doc(doc.id)
      const oldData = doc.data()

      const updateData = {}

      if (!oldData.gender) {
        updateData.gender = newGender
        profileUpdated = true
      } else if (!oldData.birthDate) {
        updateData.birthDate = newBirthDate
        profileUpdated = true
      } else if (!oldData.bio) {
        updateData.bio = newBio
        profileUpdated = true
      }

      if (Object.keys(updateData).length > 0) {
        updatePromises.push(docRef.update(updateData))
      }

      updatePromises.push(
        docRef.update({
          username: newUsername,
          bio: newBio,
          gender: newGender,
          birthDate: newBirthDate
        })
      )
    })

    await Promise.all(updatePromises)

    console.log(profileUpdated)

    if (profileUpdated === true) {
      res.status(201).json({
        error: false,
        message: 'Profile tidak berubah',
        data: {
          id: snapshot.docs[0].id,
          email,
          username: newUsername,
          bio: newBio,
          gender: newGender,
          birthDate: newBirthDate
        }
      })
    } else {
      res.status(200).json({
        error: false,
        message: 'Profile berhasil diubah',
        data: {
          id: snapshot.docs[0].id,
          email,
          username: newUsername,
          bio: newBio,
          gender: newGender,
          birthDate: newBirthDate
        }
      })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Ada yang salah saat update profile' })
  }
})

module.exports = router
