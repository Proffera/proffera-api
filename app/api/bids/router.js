const express = require("express");
const addBids = require("./controller");
const router = express.Router();

router.post("/bids", addBids);

module.exports = router;
