const express = require("express");
const controller = require("./procurement.controller");
    
const router = express.Router();

router.post("/procurement", controller.addProcurement);
router.get("/procurement", controller.getAllProcurement);
router.get("/procurement/:id", controller.findProcurement);
router.put("/procurement/:id", controller.updateProcurement);
router.delete("/procurement/:id", controller.deleteProcurement);

module.exports = router;