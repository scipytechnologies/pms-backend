const express=require("express");
const router=express.Router()

const InventoryManagementController=require('../controllers/InventoryManagementController')

router.post('/createInventoryManagement/:id',InventoryManagementController.createInventoryManagement)
// module.exports = router;
router.get('/getInventoryManagement',InventoryManagementController.getInventoryManagement)
router.get('/getInventoryManagementById/:id',InventoryManagementController.getInventoryManagementById)
router.put('/updateInventoryManagement/:id',InventoryManagementController.updateInventoryManagement)
router.delete('/deleteInventoryManagement/:id',InventoryManagementController.deleteInventoryManagement)

module.exports = router;    