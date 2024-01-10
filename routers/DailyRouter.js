const express = require("express")
const router = express.Router()
const DailyReportController = require("../controllers/DailyReportController")

router.get("/getdailyByid/:id/:Date",DailyReportController.getPumpSalesOnDate)

module.exports = router