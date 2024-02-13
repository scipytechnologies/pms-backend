const express=require("express");
const router=express.Router()

const DipStockcontroller=require('../controllers/DipStockController')

router.post('/createDipStock/:id',DipStockcontroller.createDipStock)
// module.exports = router;
router.get('/getDipStock/:id',DipStockcontroller.getDipStock)
router.get('/getDipStockById/:id',DipStockcontroller.getDipStockById)
router.put('/updateDipStock/:id/:pumpid',DipStockcontroller.updateDipStock)
router.delete('/deleteDipStock/:pumpId/:id',DipStockcontroller.deleteDipStock)

module.exports = router;                                                