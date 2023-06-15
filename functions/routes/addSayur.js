const express = require('express')
const router = express.Router()
const db = require('../config')

router.post('/', async (req, res) => {
  try {
    const {
      name,
      photoUrl,
      price,
      discount,
      weight,
      stock
    } = req.body

    const validName = [
      'Kacang',
      'Pare',
      'Labu Botol',
      'Terong',
      'Brokoli',
      'Kubis',
      'Paprika',
      'Wortel',
      'Kembang Kol',
      'Timun',
      'Pepaya',
      'Kentang',
      'Labu',
      'Lobak',
      'Tomat'
    ]

    if (!validName.includes(name)) {
      res.status(400).json({ error: 'Kategori tidak valid' })
      return
    }

    const sayurRef = db.collection('sayur')
    const querySnapshot = await sayurRef.where('name', '==', name).get()

    if (!querySnapshot.empty) {
      res.status(409).json({ error: 'Sayur sudah ada' })
    } else {
      const hargaDiscount = price - (price * discount / 100)

      const sayurDocRef = sayurRef.doc() // Membuat referensi dokumen baru dengan ID acak
      const SayurId = sayurDocRef.id

      await sayurRef.doc(SayurId).set({
        id: SayurId,
        name,
        photoUrl,
        price,
        discount,
        weight,
        stock,
        hargaDiscount
      })

      res.status(200).json({
        error: false,
        message: 'Sayur Berhasil ditambahkan',
        data: {
          id: SayurId,
          name,
          photoUrl,
          price,
          discount,
          weight,
          stock,
          hargaDiscount
        }
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ada yang salah saat menambah sayur' })
  }
})

module.exports = router
