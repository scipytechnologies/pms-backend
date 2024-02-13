const express = require("express")
const router = express.Router()
const FuelTestController = require("../controllers/FuelTestController")

router.post("/createFuelTest/:id",FuelTestController.createFuelTest)
router.get("/getFuelTest",FuelTestController.getFuelTest)
router.get("/getFuelTestById/:id",FuelTestController.getFuelTestById)
router.put("/editFuelTest/:id",FuelTestController.editFuelTest)
router.delete("/deleteFuelTest/:id/:PumpId",FuelTestController.deleteFuelTest)

module.exports = router;