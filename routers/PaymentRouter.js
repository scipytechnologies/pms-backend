const express = require("express")
const router = express.Router()
const PaymentController = require("../controllers/PaymentController")

router.post("/createpayment/:id",PaymentController.createPayment)
router.get("/getpayment",PaymentController.getPayment)
router.get("/getpaymentById/:id",PaymentController.getPaymentById)
router.put("/updatepayment/:id",PaymentController.updatePayment)
router.delete("/deletepayment/:pumpId/:paymentId",PaymentController.deletePayment)
module.exports = router;