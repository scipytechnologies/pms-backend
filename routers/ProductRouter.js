const express=require("express");
const router=express.Router()

const ProductController=require('../controllers/ProductController')

router.post('/createProduct/:id',ProductController.createProduct)
// module.exports = router;
router.get('/getProduct',ProductController.getProduct)
router.get('/getProductById/:id',ProductController.getProductById)
router.put('/updateProduct/:id',ProductController.updateProduct)
router.delete('/deleteProduct/:id',ProductController.deleteProduct)

module.exports = router;                                                