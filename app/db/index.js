const admin = require("firebase-admin");
const firebaseConfig = require("../../key.json") || JSON.parse(process.env.FIREBASE_KEY);
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const db = admin.firestore();

module.exports = db;
