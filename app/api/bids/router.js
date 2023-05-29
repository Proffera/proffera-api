const express = require("express");
const { addBids, getBids, findBids } = require("./controller");
const router = express.Router();

router.post("/bids", addBids);
router.get("/bids", getBids);
router.get("/bids/:id", findBids);

module.exports = router;
