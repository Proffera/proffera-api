const express = require("express");
const controller = require("./vendor.controller");
    
const router = express.Router();

router.post("/vendor", controller.addVendor);
router.get("/vendor", controller.getAllVendor);
router.get("/vendor/:id", controller.findVendor);
router.put("/vendor/:id", controller.updateVendor);
router.delete("/vendor/:id", controller.deleteVendor);

module.exports = router;