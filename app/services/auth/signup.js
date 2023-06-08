const db = require("../../db")
const { createUserWithEmailAndPassword } = require("firebase/auth")
const { auth } = require("../../config")

const signUp = async (req) => {
  let token;
  const newUsers = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }
  return createUserWithEmailAndPassword(auth, newUsers.email, newUsers.password).then((userCred) => {
    const uid = userCred.user.uid;
    token = userCred.user.getIdToken();
    const userSchema = {
      role: newUsers.role,
      email: newUsers.email,
      createdAt: new Date().toISOString(),
    }
    return db.collection("User").doc(uid).set(userSchema);
  }).then(() => {
    return token
  }).catch((error) => {
    if (error.code === "auth/email-already-in-use")
      return "USER ALREADY SIGNUP"
  })
}

module.exports = signUp;