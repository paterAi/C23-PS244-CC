const express = require('express')
const router = express.Router()
const db = require('../config')

// Endpoint untuk mendapatkan data sayur
router.get('/', async (req, res) => {
  try {
    const idSayur = req.query.idSayur

    // Mengambil data sayur dari Firestore
    const sayurRef = db.collection('sayur')
    const query = sayurRef.where('idSayur', '==', idSayur)
    const snapshot = await query.get()

    if (snapshot.empty) {
      res.status(404).json({ error: 'Sayur tidak ditemukan' })
      return
    }

    let sayurData = {}
    // Loop melalui setiap dokumen hasil query
    snapshot.forEach((doc) => {
      sayurData = doc.data()
      sayurData.id = doc.id
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil melihat data sayur',
      data: sayurData
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ada yang salah saat melihat data sayur' })
  }
})

module.exports = router
