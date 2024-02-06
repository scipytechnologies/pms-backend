const express = require("express")
const router = express.Router()

const EcommerceController = require("../controllers/EcommerceController")

router.post("/createEcommerce/:id",EcommerceController.createEcommerce)
router.get("/getEcommerce",EcommerceController.getEcommerce)
router.get("/getByIdEcommerce/:id",EcommerceController.getByIdEcommerce)

module.exports = router