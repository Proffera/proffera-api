const express = require("express");
const { addBids, getBids, findBids, updateBids, deleteBids } = require("./controller");
const upload = require("../../middlewares/multer")
const { authMiddlewares, isVendor } = require("../../middlewares/authentication")
const router = express.Router();

router.post("/bids", isVendor, upload.single("fileProposal"), addBids); // Allow Only Vendor have a Access Create Bids
router.get("/bids", getBids); // Allow All user access Bids (PUBLIC)
router.get("/bids/:id", findBids); // Allow All user access Bids (PUBLIC)
// Allow to Update contractAmount and biddingStatus
router.put("/bids/:id", authMiddlewares, updateBids); // Allow All Authentication User to edit Bids
// Ini enak e siapa yang bisa hapus bidding merka? apakah bisa semua user melakukan penghapusan atau user tertentu atau gauash
router.delete("/bids/:id", authMiddlewares, deleteBids);

module.exports = router;
