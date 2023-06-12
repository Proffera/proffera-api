const { getAuth } = require("firebase-admin/auth")
const db = require("../db")


// Global Authentication
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
    return uid = decodedToken.uid
  }).then((data) => {
    res.set("uid", data)
    next();
  }).catch((error) => {
    if (error.code === "auth/id-token-expired") {
      res.status(400).send({
        error: "TOKEN EXPIRED",
        message: "PLEASE LOGIN AGAIN !"
      })
    } else {
      res.status(500).send({
        error: "INTERNAL SERVER ERROR"
      })
    }
  })
}

// Authentication Only For Government Restricted Data
const isGovernment = (req, res, next) => {
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
    return uid = decodedToken.uid
  }).then((data) => {
    const govDoc = db.collection("Government").doc(data);
    const gov = govDoc.get()
    gov.then((data) => {
      if (data.exists) {
        next()
      } else {
        res.status(403).send({
          error: "FORBIDDEN",
          message: "You aren't Government"
        })
      }
    })
  }).catch((error) => {
    if (error.code === "auth/id-token-expired") {
      res.status(400).send({
        error: "TOKEN EXPIRED",
        message: "PLEASE LOGIN AGAIN !"
      })
    } else {
      res.status(500).send({
        error: "INTERNAL SERVER ERROR"
      })
    }
  })
}

// Authentication Only For Vendor Restricted Data
const isVendor = (req, res, next) => {
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
    return uid = decodedToken.uid
  }).then((data) => {
    const govDoc = db.collection("Vendor").doc(data);
    const gov = govDoc.get()
    gov.then((data) => {
      if (data.exists) {
        next()
      } else {
        res.status(403).send({
          error: "FORBIDDEN",
          message: "You aren't Vendor"
        })
      }
    })
  }).catch((error) => {
    if (error.code === "auth/id-token-expired") {
      res.status(400).send({
        error: "TOKEN EXPIRED",
        message: "PLEASE LOGIN AGAIN !"
      })
    } else {
      res.status(500).send({
        error: "INTERNAL SERVER ERROR"
      })
    }
  })
}
module.exports = { authMiddlewares, isGovernment, isVendor };
