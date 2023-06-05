const jwt = require('jsonwebtoken')
require('dotenv').config()

// Verifikasi token JWT
const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.authorization
  const token = authHeaders && authHeaders.split(' ')[1]
  if (token == null) {
    return res.status(401).json({ error: 'Unauthorized: Token tidak ada' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Token tidak valid' })
    }
    req.email = decoded.email
    next()
  })
}

module.exports = { verifyToken }
