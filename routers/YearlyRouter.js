const express = require("express")
const router = express.Router()
const MonthlyReportController = require("../controllers/YearlyReportController")

router.get("/getyearlyByid/:id/:Date", MonthlyReportController.getPumpSalesOnYear)

module.exports = router