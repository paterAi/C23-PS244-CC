const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const router = express.Router();
const db = require('../config');

router.post('/', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) {
            return res.status(204).json({ error: 'Tidak ada' });
        }
        const usersRef = db.collection('users');
        const query = usersRef.where('refreshToken', '==', refreshToken);
        const snapshot = await query.get();

        if (snapshot.empty) {
            res.status(204).json({ error: 'Tidak ada' });
        }
        const email = snapshot.docs[0].data().email;
        await usersRef.doc(snapshot.docs[0].id).update({
            refreshToken: ''
        });
        res.clearCookie('refreshToken');
        res.status(200).json({ message: "Berhasil Logout" });
    } catch (error) {
        
    }
});