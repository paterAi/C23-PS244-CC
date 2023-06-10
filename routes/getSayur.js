const express = require('express')
const router = express.Router()
const db = require('../config')

// Endpoint untuk mendapatkan profil pengguna
router.get('/', async (req, res) => {
  try {
    const idSayur = req.body

    // Mengambil data profil pengguna dari Firestore
    const usersRef = db.collection('sayur')
    const query = usersRef.where('idSayur', '==', idSayur)
    const snapshot = await query.get()

    if (snapshot.empty) {
      res.status(404).json({ error: 'Sayur tidak ditemukan' })
      return
    }

    const sayurData = {}
    // Loop melalui setiap dokumen hasil query
    snapshot.forEach((doc) => {
      const sayurData = doc.data()

      const { idSayur, Judul, harga, ukuran, satuan, discount, kategori, deskripsi, stok, hargaDiscount } = sayurData

      sayurData.id = doc.id
      sayurData.idSayur = idSayur
      sayurData.Judul = Judul
      sayurData.harga = harga
      sayurData.discount = discount
      sayurData.hargaDiscount = hargaDiscount
      sayurData.ukuran = ukuran
      sayurData.satuan = satuan
      sayurData.kategori = kategori
      sayurData.deskripsi = deskripsi
      sayurData.stok = stok
    })
    res.status(200).json(sayurData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Sepertinya ada yang salah' })
  }
})

module.exports = router
