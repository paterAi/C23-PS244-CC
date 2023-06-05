const express = require('express')
const router = express.Router()
const db = require('../config')

// Menambahkan sayur ke keranjang user
router.post('/', async (req, res) => {
  try {
    const { email, IDSayur, jumlah } = req.body

    // Mengecek apakah user ada di database
    const usersRef = db.collection('users')
    const userSnapshot = await usersRef.where('email', '==', email).get()
    if (userSnapshot.empty) {
      return res.status(404).json({ error: 'User tidak ditemukan' })
    }

    // Mengecek apakah sayur ada di database
    const sayurRef = db.collection('sayur')
    const sayurSnapshot = await sayurRef.doc(IDSayur).get()
    if (!sayurSnapshot.exists) {
      return res.status(404).json({ error: 'Sayur tidak ditemukan' })
    }

    // Mengecek apakah jumlah sayur yang diminta tersedia
    const jumlahSayur = sayurSnapshot.data().jumlah
    if (jumlah > jumlahSayur) {
      return res.status(400).json({ error: 'Jumlah sayur tidak tersedia' })
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
    await keranjangRef.add({
      IDSayur,
      jumlah
    })

    // Mengurangi jumlah sayur yang tersedia di koleksi sayur
    const newJumlahSayur = jumlahSayur - jumlah
    await sayurRef.doc(IDSayur).update({ jumlah: newJumlahSayur })

    res.status(200).json({ message: 'Sayur berhasil ditambahkan ke keranjang' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan sayur ke keranjang' })
  }
})

module.exports = router
