var admin = require("firebase-admin");

var serviceAccount = require("../penting/credentials.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
