const express = require("express");
const { addBids, getBids, findBids, updateBids, deleteBids } = require("./controller");
const upload = require("../../middlewares/multer")
const router = express.Router();

router.post("/bids", upload.single("fileProposal"), addBids);
router.get("/bids", getBids);
router.get("/bids/:id", findBids);
// Allow to Update contractAmount and biddingStatus
router.put("/bids/:id", updateBids);
router.delete("/bids/:id", deleteBids);

module.exports = router;
