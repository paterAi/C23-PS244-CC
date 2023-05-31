const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authentication');
const db = require('../config');

// Endpoint untuk menambahkan item ke keranjang
router.post('/', verifyToken, async (req, res) => {
  try {
    const { itemId } = req.body;
    const { uid } = req.user;

    // Lakukan operasi menambahkan item ke keranjang sesuai dengan data pengguna yang sedang login
    const userRef = db.collection('users').doc(uid);

    // Lakukan pengecekan apakah item sudah ada di keranjang pengguna atau belum
    const userSnapshot = await userRef.get();
    if (userSnapshot.exists) {
      const userData = userSnapshot.data();
      const { cart } = userData;

      if (cart && cart.includes(itemId)) {
        return res.status(400).json({ error: 'Item sudah ada di keranjang' });
      }

      // Tambahkan item ke keranjang pengguna
      await userRef.update({
        cart: [...cart, itemId]
      });

      return res.status(200).json({ message: 'Item berhasil ditambahkan ke keranjang' });
    } else {
      return res.status(404).json({ error: 'Data pengguna tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan item ke keranjang' });
  }
});

module.exports = router;
