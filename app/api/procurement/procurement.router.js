const express = require("express");
const controller = require("./procurement.controller");
const { isGovernment } = require("../../middlewares/authentication")
const router = express.Router();

// Only Government Can Create a Procurement
router.post("/procurement", isGovernment, controller.addProcurement);
// Allow To Access Public
router.get("/procurement", controller.getAllProcurement);
router.get("/procurement/:id", controller.findProcurement);

// Only government can edit and delete Procurement
router.put("/procurement/:id", isGovernment, controller.updateProcurement);
router.delete("/procurement/:id", isGovernment, controller.deleteProcurement);

module.exports = router;