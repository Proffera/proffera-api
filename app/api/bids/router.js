const express = require("express");
const { addBids, getBids, findBids, updateBids } = require("./controller");
const upload = require("../../middlewares/multer");
const {
  authMiddlewares,
  isVendor,
  isGovernment,
} = require("../../middlewares/authentication");
const router = express.Router();

router.post("/bids", isVendor, upload.single("fileProposal"), addBids); // Allow Only Vendor have a Access Create Bids
router.get("/bids", getBids); // Allow All user access Bids (PUBLIC)
router.get("/bids/:id", findBids); // Allow All user access Bids (PUBLIC)
// Allow to Update biddingStatus KontrakDeal
router.put("/bids/:id", isGovernment, updateBids); // Allow Government User to edit

module.exports = router;
