const express=require("express");
const router=express.Router()

const Customercontroller=require('../controllers/CustomerController')

router.post('/createcustomer/:id',Customercontroller.createCustomer)
// module.exports = router;
router.get('/getcustomer',Customercontroller.getCustomer)
router.get('/getcustomerbyid/:id',Customercontroller.getCustomerById)
router.put('/updatecustomer/:id',Customercontroller.updateCustomer)
router.delete('/deletecustomer/:id',Customercontroller.deleteCustomer)

module.exports = router;                                                