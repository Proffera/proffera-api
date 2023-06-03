const express = require("express");
const controller = require("./government.controller");
    
const router = express.Router();

router.post("/government", controller.addGovernment);
router.get("/government", controller.getAllGovernment);
router.get("/government/:id", controller.findGovernment);
router.put("/government/:id", controller.updateGovernment);
router.delete("/government/:id", controller.deleteGovernment);

module.exports = router;