const express=require("express");
const router=express.Router()

const Employeecontroller=require('../controllers/EmployeeController')

router.post('/createemployee/:id',Employeecontroller.createEmployee)
// module.exports = router;
router.get('/getemployee',Employeecontroller.getEmployee)
router.get('/getemployeebyid/:id',Employeecontroller.getEmployeeById)
router.put('/updateemployee/:id/:pumpid',Employeecontroller.updateEmployee)
router.delete('/deleteemployee/:pumpId/:employeeId',Employeecontroller.deleteEmployee)

module.exports = router;                                                 