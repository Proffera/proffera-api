const express = require("express");
const controller = require("./vendor.controller");
const { authMiddlewares, isVendor } = require("../../middlewares/authentication");

const router = express.Router();

router.post("/vendor", isVendor, controller.addVendor);
router.get("/vendor", authMiddlewares, controller.getAllVendor);
router.get("/vendor/:id", authMiddlewares, controller.findVendor);
router.put("/vendor/:id", isVendor, controller.updateVendor);
router.delete("/vendor/:id", isVendor, controller.deleteVendor);

module.exports = router;