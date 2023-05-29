var admin = require("firebase-admin");

var serviceAccount = require("./fir-salman-1ec3a-firebase-adminsdk-cdsau-8929739bbf.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;






