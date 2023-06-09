const express = require("express");
const controller = require("./government.controller");
const { isGovernment, authMiddlewares } = require("../../middlewares/authentication")
const router = express.Router();

router.post("/government", isGovernment, controller.addGovernment);
router.get("/government", authMiddlewares, controller.getAllGovernment);
router.get("/government/:id", authMiddlewares, controller.findGovernment);
router.put("/government/:id", isGovernment, controller.updateGovernment);
router.delete("/government/:id", isGovernment, controller.deleteGovernment);

module.exports = router;