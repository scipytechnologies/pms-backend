const express=require("express");
const router=express.Router()

const Pumpcontroller=require('../controllers/PumpController')

router.post('/createpump',Pumpcontroller.createPump)
router.put('/createTank/:id',Pumpcontroller.createTank)
router.put('/createFuel/:id',Pumpcontroller.createFuel)
router.put('/createNozzle/:id',Pumpcontroller.createNozzle)
router.put('/createCardPayment/:id',Pumpcontroller.createCardPayment)
router.put('/createUPIPayment/:id',Pumpcontroller.createUPIPayment)
router.put('/createOtherPayment/:id',Pumpcontroller.createOtherPayment)
router.get('/getpump',Pumpcontroller.getPump)
router.get('/getpumpbyid/:id',Pumpcontroller.getPumpById)
router.get('/getcustomerbyid/:id',Pumpcontroller.getCustomer)
router.get('/getdipStockbyid/:id',Pumpcontroller.getDipStock)
router.get('/getemployeebyid/:id',Pumpcontroller.getEmployee)
router.get('/getinventoryManagementbyid/:id',Pumpcontroller.getInventoryManagement)
router.get('/getproductbyid/:id',Pumpcontroller.getProduct)
router.get('/getsalesAndBillingbyid/:id',Pumpcontroller.getSalesAndBilling)
router.put('/updatepump/:id',Pumpcontroller.updatePump)
router.delete('/deletepump/:id',Pumpcontroller.deletePump)
module.exports = router;                                                