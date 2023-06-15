const express = require('express')
require('dotenv').config()
const router = express.Router()
const db = require('../config')

router.post('/', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      res.status(401).json({ error: 'Tidak ada' })
      return
    }
    const usersRef = db.collection('users')
    const query = usersRef.where('refreshToken', '==', refreshToken)
    const snapshot = await query.get()

    if (snapshot.empty) {
      res.status(401).json({ error: 'Tidak ada' })
      return
    }
    // eslint-disable-next-line no-unused-vars
    const email = snapshot.docs[0].data().email
    await usersRef.doc(snapshot.docs[0].id).update({
      refreshToken: ''
    })
    res.clearCookie('refreshToken')
    res.status(200).json({ message: 'Berhasil Logout' })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

module.exports = router
