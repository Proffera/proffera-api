const db = require("../../db")
const { createUserWithEmailAndPassword } = require("firebase/auth")
const { auth } = require("../../config")

const signUp = async (req) => {
  const role = req.body.role;
  let token;
  if (role === "Government") {
    const newUsers = {
      email: req.body.email,
      password: req.body.password,
      institute: req.body.institute,
      address: req.body.address,
      procurementId: "",
    }
    return createUserWithEmailAndPassword(auth, newUsers.email, newUsers.password).then((userCred) => {
      const uid = userCred.user.uid
      token = userCred.user.getIdToken()
      const govSchema = {
        email: newUsers.email,
        institute: newUsers.institute,
        address: newUsers.address,
        procurementId: newUsers.procurementId,
        createdAt: new Date().toISOString()
      }
      return db.collection(role).doc(uid).set(govSchema);
    }).then(() => {
      return token
    }).catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        return "USER ALREADY SIGNUP"
      } else if (error.code === "auth/weak-password") {
        return "PASSWORD TO WEAK"
      }
    })
  } else if (role === "Vendor") {
    const newUsers = {
      email: req.body.email,
      password: req.body.password,
      institute: req.body.institute,
      address: req.body.address,
      npwp: req.body.npwp,
      bidId: db.collection("Bids"),
    }
    return createUserWithEmailAndPassword(auth, newUsers.email, newUsers.password).then((userCred) => {
      const uid = userCred.user.uid;
      token = userCred.user.getIdToken();
      const venSchema = {
        email: req.body.email,
        password: req.body.password,
        institute: req.body.institute,
        address: req.body.address,
        npwp: req.body.npwp,
        bidId: "",
        createdAt: new Date().toISOString(),
      }
      return db.collection(role).doc(uid).set(venSchema)
    }).then(() => {
      return token
    }).catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        return "USER ALREADY SIGNUP"
      } else if (error.code === "auth/weak-password") {
        return "PASSWORD TO WEAK"
      } else {
        return error.code
      }
    })
  }
}

module.exports = signUp;