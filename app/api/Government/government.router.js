const express = require("express");
const controller = require("./government.controller");
const {
  isGovernment,
  authMiddlewares,
} = require("../../middlewares/authentication");
const router = express.Router();
const upload = require("../../middlewares/multer");

router.get("/government", authMiddlewares, controller.getAllGovernment);
router.get("/government/:id", authMiddlewares, controller.findGovernment);
router.put(
  "/government",
  isGovernment,
  upload.single("profileImage"),
  controller.updateGovernment
);
router.delete("/government", isGovernment, controller.deleteGovernment);

module.exports = router;
