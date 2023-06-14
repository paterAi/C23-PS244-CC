const express = require('express')
const router = express.Router()
const db = require('../config')

// Endpoint untuk mendapatkan semua data sayur
router.get('/', async (req, res) => {
  try {
    // Mengambil semua data sayur dari Firestore
    const sayurRef = db.collection('sayur')
    const snapshot = await sayurRef.get()

    if (snapshot.empty) {
      res.status(404).json({ error: 'Tidak ada data sayur' })
      return
    }

    const sayurData = []
    // Loop melalui setiap dokumen hasil query
    snapshot.forEach((doc) => {
      const data = doc.data()
      const sayur = {
        id: doc.id,
        name: data.name,
        photoUrl: data.photoUrl,
        price: data.price,
        discount: data.discount,
        weight: data.weight,
        stock: data.stock,
        hargaDiscount: data.hargaDiscount
      }
      sayurData.push(sayur)
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil mendapatkan data semua sayur',
      data: sayurData
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ada yang salah saat mendapatkan data sayur' })
  }
})

module.exports = router
