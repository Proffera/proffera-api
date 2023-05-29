const express = require("express");
const { addBids, getBids, findBids, updateBids} = require("./controller");
const router = express.Router();

router.post("/bids", addBids);
router.get("/bids", getBids);
router.get("/bids/:id", findBids);
router.put("/bids/:id", updateBids);

module.exports = router;
