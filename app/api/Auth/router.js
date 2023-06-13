const express = require("express");
const { signupUser, signInUser, logout } = require("./controller");
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", signInUser);
router.post("/signout", logout);

module.exports = router;
