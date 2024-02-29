const express=require("express");
const router=express.Router()
const multer = require("multer");
// Multer configuration
const upload = multer({ dest: "uploads/" });
const ProductController=require('../controllers/ProductController')

router.post('/createProduct/:id',ProductController.createProduct)
// module.exports = router;
router.get('/getProduct/:id',ProductController.getProduct)
router.get('/getProductById/:id',ProductController.getProductById)
router.put('/updateProduct/:id',upload.single("image"),ProductController.updateProduct)
router.delete('/deleteProduct/:categoryId/:id',ProductController.deleteProduct)
router.delete('/deleteCategory/:pumpid/:id',ProductController.deleteCategory)

router.put('/onsale/:cat/:id',ProductController.onSales)
module.exports = router;                                                