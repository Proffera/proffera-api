const express = require("express");
const { signupUser, signInUser } = require("./controller")
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", signInUser);

module.exports = router;