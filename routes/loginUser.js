const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const router = express.Router()
const db = require('../config')

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    const usersRef = db.collection('users')
    const query = usersRef.where('email', '==', email)
    const snapshot = await query.get()

    if (snapshot.empty) {
      res.status(404).json({ error: 'Account not registered' })
      return
    }

    const match = await bcrypt.compare(password, snapshot.docs[0].data().password)
    if (!match) {
      res.status(401).json({ error: 'Incorrect password' })
      return
    }

    const username = snapshot.docs[0].data().username

    const accessSecretKey = process.env.ACCESS_TOKEN_SECRET
    const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET

    const accessToken = jwt.sign({ username, email }, accessSecretKey, { expiresIn: '30s' })

    const refreshToken = jwt.sign({ username, email }, refreshSecretKey, { expiresIn: '1d' })

    await usersRef.doc(snapshot.docs[0].id).update({
      refreshToken
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
      // secure: true
    })

    res.status(200).json({
      error: false,
      message: 'Login Successful',
      data: {
        username
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error occurred while logging in' })
  }
})

module.exports = router
