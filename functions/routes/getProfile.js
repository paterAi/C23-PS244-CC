const express = require('express')
const router = express.Router()
const db = require('../config')
const { verifyToken } = require('../middleware/verifyToken')

// Endpoint to get user profile
router.get('/', verifyToken, async (req, res) => {
  try {
    const email = req.email

    const usersRef = db.collection('users')
    const query = usersRef.where('email', '==', email)
    const snapshot = await query.get()

    if (snapshot.empty) {
      res.status(404).json({ error: 'Akun tidak ada' })
      return
    }

    let profileData = {}

    snapshot.forEach((doc) => {
      const userData = doc.data()
      const { email, username, bio, gender, birthDate } = userData
      profileData = {
        id: doc.id,
        email,
        username,
        bio,
        gender,
        birthDate
      }
    })

    res.status(200).json({
      error: false,
      message: 'Profile berhasil dilihat',
      data: profileData
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ada yang salah saat melihat profile' })
  }
})

module.exports = router
