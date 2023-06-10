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

    const sayurRef = db.collection('sayur')
    const docRef = sayurRef.doc(idSayur)
    const docSnapshot = await docRef.get()

    if (!(kategori === 'Bean' || kategori === 'Bitter Gourd' || kategori === 'Bottle Gourd' || kategori === 'Eggplant' || kategori === 'Broccoli' || kategori === 'Cabbage' || kategori === 'Bell Pepper' || kategori === 'Carrot' || kategori === 'Cauliflower' || kategori === 'Cucumber' || kategori === 'Papaya' || kategori === 'Potato' || kategori === 'Pumpkin' || kategori === 'Radish' || kategori === 'Tomato')) {
      res.status(400).json({ error: 'Kategori tidak termasuk kategori yang valid' })
    }

    if (docSnapshot.exists) {
      res.status(409).json({ error: 'Sayur sudah ada' })
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

      res.status(200).json({ message: 'Data sayur berhasil ditambahkan' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data sayur' })
  }
})

module.exports = router
