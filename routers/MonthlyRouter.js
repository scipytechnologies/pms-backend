const express = require("express")
const router = express.Router()
const MonthlyReportController = require("../controllers/MonthlyReportController")

router.get("/getmonthlyByid/:id/:Date", MonthlyReportController.getPumpSalesOnMonth)

module.exports = router