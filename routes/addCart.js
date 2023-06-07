const express = require('express')
const router = express.Router()
const db = require('../config')
const { verifyToken } = require('../middleware/verifyToken')

// Menambahkan sayur ke keranjang user
router.post('/', verifyToken, async (req, res) => {
  try {
    const { inputEmail, inputIDSayur, inputJumlah } = req.body

    const jumlah = inputJumlah
    const IDSayur = inputIDSayur

    // Mengecek apakah user ada di database
    const usersRef = db.collection('users')
    const userSnapshot = await usersRef.where('email', '==', inputEmail).get()
    if (userSnapshot.empty) {
      return res.status(404).json({ error: 'User tidak ditemukan' })
    }

    // Mengecek apakah sayur ada di database
    const sayurRef = db.collection('sayur')
    const sayurSnapshot = await sayurRef.doc(inputIDSayur).get()
    if (!sayurSnapshot.exists) {
      return res.status(404).json({ error: 'Sayur tidak ditemukan' })
    }

    // Mengecek apakah jumlah sayur yang diminta tersedia
    const stok = sayurSnapshot.data().stok
    if (inputJumlah > stok) {
      return res.status(400).json({ error: 'Stok kurang' })
    }

    // Mendapatkan keranjang user
    const keranjangRef = usersRef.doc(userSnapshot.docs[0].id).collection('keranjang')
    const keranjangSnapshot = await keranjangRef.get()

    // Mengecek apakah sayur sudah ada di keranjang user
    const existingSayur = keranjangSnapshot.docs.find((doc) => doc.data().IDSayur === IDSayur)
    if (existingSayur) {
      return res.status(400).json({ error: 'Sayur sudah ada di keranjang' })
    }

    // Menambahkan sayur ke keranjang user
    await keranjangRef.doc(IDSayur).set({
      IDSayur,
      jumlah
    })

    // Mengurangi jumlah sayur yang tersedia di koleksi sayur
    const newStok = stok - jumlah
    await sayurRef.doc(IDSayur).update({ stok: newStok })

    res.status(200).json({ message: 'Sayur berhasil ditambahkan ke keranjang' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
