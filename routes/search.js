const express = require('express')
const router = express.Router()
const db = require('../config')

router.get('/search', async (req, res) => {
  try {
    const katakunci = req.query.katakunci

    if (!katakunci) {
      res.status(400).json({ error: true, message: 'Katakunci salah' })
      return
    }

    const sayurRef = db.collection('sayur')
    const querySnapshot = await sayurRef.where('kategori', '==', katakunci).get()

    if (querySnapshot.empty) {
      res.status(404).json({ error: true, message: 'Hasil pencarian tidak ditemukan' })
      return
    }

    const sayurData = []
    querySnapshot.forEach((doc) => {
      sayurData.push(doc.data())
    })

    res.status(200).json({
      error: false,
      message: `Hasil pencarian '${katakunci}'`,
      data: sayurData
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true, message: 'Ada yang salah saat mencari sayur' })
  }
})

module.exports = router
