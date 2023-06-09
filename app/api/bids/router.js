const express = require("express");
const { addBids, getBids, findBids, updateBids, deleteBids } = require("./controller");
const upload = require("../../middlewares/multer")
const { authMiddlewares } = require("../../middlewares/authentication")
const router = express.Router();

router.post("/bids", authMiddlewares, upload.single("fileProposal"), addBids);
router.get("/bids", getBids);
router.get("/bids/:id", authMiddlewares, findBids);
// Allow to Update contractAmount and biddingStatus
router.put("/bids/:id", authMiddlewares, updateBids);
router.delete("/bids/:id", authMiddlewares, deleteBids);

module.exports = router;
