const express = require("express")
const router = express.Router()
const DailyReportController = require("../controllers/DailyReportController")

router.get("/getdailyByid/:id/:SalesAndBillingName",DailyReportController.getPumpSalesOnDate)

module.exports = router