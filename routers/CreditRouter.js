const express = require('express')
const router = express.Router()
const CreditController = require("../controllers/CreditController")

router.post("/createcredit/:id",CreditController.createCredit)
router.get("/getcredit",CreditController.getCredit)
router.get("/getcreditById/:id",CreditController.getCreditById)
router.put("/updatecredit/:id",CreditController.updateCredit)
router.delete("/deletecredit/:pumpId/:creditId",CreditController.deleteCredit)

module.exports = router;