const express = require('express');
const router = express.Router();
const db = require('../config');

router.post('/', async (req, res) => {
  try {
    const { 
        judul, 
        harga, 
        satuan, 
        satuanUkuran, 
        discount, 
        kategori, 
        deskripsi, 
        stok, 
        namaToko, 
        dikirimDari } = req.body;

    const sayurRef = db.collection('sayur');
    const docSnapshot = await sayurRef.doc(kategori).get();
    
    if (docSnapshot.exists) {
      res.status(409).json({ error: 'Nama sayur sudah ada' });
    } else {
      const hargaDiscount = harga - (harga * discount / 100);
      
      await sayurRef.doc(kategori).set({
        judul: judul,
        harga: harga,
        satuan: satuan,
        satuanUkuran: satuanUkuran,
        discount: discount,
        kategori: kategori,
        deskripsi: deskripsi,
        stok: stok,
        namaToko: namaToko,
        dikirimDari: dikirimDari,
        hargaDiscount: hargaDiscount
      });
      
      res.status(200).json({ message: 'Data sayur berhasil ditambahkan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data sayur' });
  }
});

module.exports = router;
