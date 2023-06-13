const express = require('express')
const router = express.Router()
const db = require('../config')

// Endpoint untuk mendapatkan data sayur
router.get('/', async (req, res) => {
  try {
    const input = req.query.input

    // Mengambil data sayur dari Firestore
    const sayurRef = db.collection('sayur')
    const query = sayurRef.where('kategori', '=', input)
    const snapshot = await query.get()

    if (snapshot.empty) {
      res.status(404).json({ error: 'Sayur tidak ditemukan' })
      return
    }

    const sayurData = {}
    // Loop melalui setiap dokumen hasil query
    snapshot.forEach((doc) => {
      const data = doc.data()
      sayurData.id = doc.id
      sayurData.push(data)
    })

    res.status(200).json({ data: sayurData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Terjadi kesalahan' })
  }
})

module.exports = router
