const express = require('express')
const router = express.Router()
const db = require('../config')

router.post('/', async (req, res) => {
  try {
    const {
      idSayur,
      judul,
      harga,
      ukuran,
      satuan,
      discount,
      kategori,
      deskripsi,
      stok
    } = req.body

    const validCategories = [
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

    if (!validCategories.includes(kategori)) {
      res.status(400).json({ error: 'Kategori tidak valid' })
      return
    }

    const sayurRef = db.collection('sayur')
    const docRef = sayurRef.doc(idSayur)
    const docSnapshot = await docRef.get()

    if (docSnapshot.exists) {
      res.status(409).json({ error: 'Sayur dengan ID tersebut sudah ada' })
    } else {
      const hargaDiscount = harga - (harga * discount / 100)

      await docRef.set({
        idSayur,
        judul,
        harga,
        ukuran,
        satuan,
        discount,
        kategori,
        deskripsi,
        stok,
        hargaDiscount
      })

      res.status(200).json({
        error: false,
        message: 'Sayur Berhasil ditambahkan',
        data: {
          idSayur,
          judul,
          harga,
          ukuran,
          satuan,
          discount,
          kategori,
          deskripsi,
          stok,
          hargaDiscount
        }
      })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Ada yang salah saat menambah sayur' })
  }
})

module.exports = router
