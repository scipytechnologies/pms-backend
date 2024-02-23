const express=require("express");
const router=express.Router()

const SalesAndBillingcontroller=require('../controllers/SalesAndBillingController')

router.post('/createSalesAndBilling/:id',SalesAndBillingcontroller.createSalesAndBilling)
// module.exports = router;
router.get('/getSalesAndBilling',SalesAndBillingcontroller.getSalesAndBilling)
router.get('/getSalesAndBillingById/:id',SalesAndBillingcontroller.getSalesAndBillingById)
router.put('/updateSalesAndBilling/:id',SalesAndBillingcontroller.updateSalesAndBilling)
router.delete('/deleteSalesAndBilling/:id',SalesAndBillingcontroller.deleteSalesAndBilling)
router.get('/getSalesReport/:id',SalesAndBillingcontroller.getSalesReport)
router.get('/getchart/:id',SalesAndBillingcontroller.SalesChart)
module.exports = router;                                                