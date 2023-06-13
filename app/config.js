const dotenv = require("dotenv");
dotenv.config();
const { initializeApp } = require("firebase/app")
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
}
initializeApp(firebaseConfig)
const auth = getAuth();
const storage = getStorage();

module.exports = { auth, storage };