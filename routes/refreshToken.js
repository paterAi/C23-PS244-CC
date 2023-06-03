const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config');
const dotenv = require('dotenv').config();
const router = express.Router();

router.put('/', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json({ error: 'Unauthorized: Token tidak ada' });
        
        const usersRef = db.collection('users');
        const query = usersRef.where('refreshToken', '==', refreshToken);
        const snapshot = await query.get();

        if (snapshot.empty) {
            res.status(403).json({ error: 'Token tidak Valid' });
            return;
        }
        await usersRef.doc(snapshot.docs[0].id).update({
            refreshToken: refreshToken
        });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if(err) return res.status(403).json({ error: 'Token tidak Valid' });
            const username = snapshot.docs[0].data().username;
            const email = snapshot.docs[0].data().email;
            const accessToken = jwt.sign({ email, username }, process.env.ACCESS_TOKEN_SECRET, { 
                expiresIn: '5h' 
            });
            res.json({ accessToken });
        });
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;