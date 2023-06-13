const express = require('express')
const router = express.Router()
const db = require('../config')
const verifyToken = require('../middleware/verifyToken')

router.post('/', verifyToken, async (req, res) => {
  try {
    const { idSayur, banyaknya } = req.body
    const email = req.user.email

    // Periksa apakah produk dengan ID yang diberikan tersedia
    const sayurRef = db.collection('sayur')
    const sayurDoc = await sayurRef.doc(idSayur).get()

    if (!sayurDoc.exists) {
      res.status(404).json({ error: 'Sayur tidak ditemukan.' })
      return
    }

    const sayurData = sayurDoc.data()
    const stokSayur = sayurData.stok

    if (stokSayur < banyaknya) {
      res.status(400).json({ error: 'Stok kurang.' })
      return
    }

    // Periksa apakah produk sudah ada di keranjang
    const cartRef = db.collection('keranjang')
    const cartQuery = cartRef.where('idSayur', '==', idSayur).where('email', '==', email)
    const cartSnapshot = await cartQuery.get()

    if (!cartSnapshot.empty) {
      // Jika produk sudah ada di keranjang, update jumlahnya
      const cartDoc = cartSnapshot.docs[0]
      const cartId = cartDoc.id
      const cartItem = cartDoc.data()

      const updatedQty = cartItem.banyaknya + banyaknya
      await cartRef.doc(cartId).update({ banyaknya: updatedQty })
    } else {
      // Jika produk belum ada di keranjang, tambahkan sebagai item baru
      const cartItem = {
        email,
        idSayur,
        banyaknya
      }

      await cartRef.add(cartItem)
    }

    // Perbarui stok produk di database
    const updatedStock = stokSayur - banyaknya
    await sayurRef.doc(idSayur).update({ stok: updatedStock })

    res.status(201).json({
      error: false,
      message: 'Product added to cart successfully',
      data: { idSayur, banyaknya }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while adding the product to the cart.' })
  }
})

module.exports = router
