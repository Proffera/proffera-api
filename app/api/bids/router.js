const express = require("express");
const { addBids, getBids } = require("./controller");
const router = express.Router();

router.post("/bids", addBids);
router.get("/bids", getBids);

module.exports = router;
