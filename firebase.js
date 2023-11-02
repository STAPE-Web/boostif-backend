const admin = require("firebase-admin");
const serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://boostif-fad4d-default-rtdb.firebaseio.com"
});

const db = admin.firestore()
const storage = admin.storage()
const auth = admin.auth()
const timestamp = admin.firestore.FieldValue.serverTimestamp()

module.exports = { db, storage, auth, timestamp }