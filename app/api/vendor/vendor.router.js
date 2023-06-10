const express = require("express");
const controller = require("./vendor.controller");
const { authMiddlewares, isVendor } = require("../../middlewares/authentication");
const upload = require("../../middlewares/multer")
const router = express.Router();

router.post("/vendor", isVendor, upload.fields([
    { name: 'ProfilePicture', maxCount: 1 },
    { name: 'filePortfolio', maxCount: 1 }
    ]), controller.addVendor);
router.get("/vendor", authMiddlewares, controller.getAllVendor);
router.get("/vendor/:id", authMiddlewares, controller.findVendor);
router.put("/vendor/:id", isVendor, controller.updateVendor);
router.delete("/vendor/:id", isVendor, controller.deleteVendor);

module.exports = router;