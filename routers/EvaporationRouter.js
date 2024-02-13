const express = require("express")
const router = express.Router()
const EvaporationController = require("../controllers/EvaporationController")

router.post("/createEvaporation/:id",EvaporationController.createEvaporation)
router.get("/getEvaporation",EvaporationController.getEvaporation)
router.get("/getEvaporationById/:id",EvaporationController.getEvaporationById)
router.put("/editEvaporation/:id",EvaporationController.editEvaporation)
router.delete("/deleteEvaporation/:id/:pumpid",EvaporationController.deleteEvaporation)

module.exports = router