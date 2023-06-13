const db = require("../../db");
const { createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../../config");

const signUp = async (req) => {
  const role = req.body.role;
  let token;
  if (role === "Government") {
    const newUsers = {
      email: req.body.email,
      password: req.body.password,
      lkpd: req.body.lkpd,
      lpse: req.body.lpse,
      satker: req.body.satker,
      address: req.body.address,
    };
    return createUserWithEmailAndPassword(
      auth,
      newUsers.email,
      newUsers.password
    )
      .then((userCred) => {
        const uid = userCred.user.uid;
        token = userCred.user.getIdToken();
        const govSchema = {
          email: newUsers.email,
          lkpd: newUsers.lkpd,
          lpse: newUsers.lpse,
          satker: newUsers.satker,
          address: newUsers.address,
          createdAt: new Date().toISOString(),
        };
        return db.collection(role).doc(uid).set(govSchema);
      })
      .then(() => {
        return token;
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          return "USER ALREADY SIGNUP";
        } else if (error.code === "auth/weak-password") {
          return "PASSWORD TO WEAK";
        }
      });
  } else if (role === "Vendor") {
    const newUsers = {
      email: req.body.email,
      password: req.body.password,
      institute: req.body.institute,
      address: req.body.address,
      npwp: req.body.npwp,
    };
    return createUserWithEmailAndPassword(
      auth,
      newUsers.email,
      newUsers.password
    )
      .then((userCred) => {
        const uid = userCred.user.uid;
        token = userCred.user.getIdToken();
        const venSchema = {
          email: req.body.email,
          institute: req.body.institute,
          address: req.body.address,
          npwp: req.body.npwp,
          createdAt: new Date().toISOString(),
        };
        return db.collection(role).doc(uid).set(venSchema);
      })
      .then(() => {
        return token;
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          return "USER ALREADY SIGNUP";
        } else if (error.code === "auth/weak-password") {
          return "PASSWORD TO WEAK";
        } else {
          return error.code;
        }
      });
  }
};

module.exports = signUp;

// SignUp Add Profile Picture
