const admin = require('firebase-admin')

const serviceAccount = require('../penting/credentials-capstone.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

module.exports = db
