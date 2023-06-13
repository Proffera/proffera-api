const express = require("express");
const controller = require("./vendor.controller");
const {
  authMiddlewares,
  isVendor,
} = require("../../middlewares/authentication");
const upload = require("../../middlewares/multer");
const router = express.Router();

router.get("/vendor", authMiddlewares, controller.getAllVendor);
router.get("/vendor/:id", authMiddlewares, controller.findVendor);
router.put(
  "/vendor",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "filePortfolio", maxCount: 1 },
  ]),
  isVendor,
  controller.updateVendor
);
router.delete("/vendor", isVendor, controller.deleteVendor);
module.exports = router;
