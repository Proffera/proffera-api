const { getAuth } = require("firebase-admin/auth")
const db = require("../db")
const authMiddlewares = (req, res, next) => {
  let idtoken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idtoken = req.headers.authorization.split('Bearer ')
  } else {
    return res.status(403).send({
      error: "UNAUTHORIZED"
    })
  }
  getAuth().verifyIdToken(idtoken[1]).then((decodedToken) => {
    req.user = decodedToken;
    return db.collection("User").doc(req.user.uid);
  }).then((data) => {
    req.headers.uid = data.path.split("/")[1]
    next();
  }).catch((error) => {
    console.log(error)
  })
}

module.exports = authMiddlewares;
