const { signInWithEmailAndPassword } = require("firebase/auth")
const { auth } = require("../../config")

const singin = async (req) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }
  return signInWithEmailAndPassword(auth, user.email, user.password).then((data) => {
    return data.user.getIdToken();
  }).catch((error) => {
    if (error.code === "auth/user-not-found") {
      return "USER NOT FOUND"
    } else if (error.code === "auth/wrong-password") {
      return "CREDENTIALS IS NOT VALID"
    }
  });
}

module.exports = singin;