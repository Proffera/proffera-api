const express = require("express");
const controller = require("./procurement.controller");
const { isGovernment } = require("../../middlewares/authentication")
const router = express.Router();

router.post("/procurement", isGovernment, controller.addProcurement);
router.get("/procurement", controller.getAllProcurement);
router.get("/procurement/:id", controller.findProcurement);
router.put("/procurement/:id", isGovernment, controller.updateProcurement);
router.delete("/procurement/:id", isGovernment, controller.deleteProcurement);

module.exports = router;