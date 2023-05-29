const express = require("express");
const { addBids, getBids, findBids, updateBids, deleteBids } = require("./controller");
const router = express.Router();

router.post("/bids", addBids);
router.get("/bids", getBids);
router.get("/bids/:id", findBids);
router.put("/bids/:id", updateBids);
router.delete("/bids/:id", deleteBids);

module.exports = router;
