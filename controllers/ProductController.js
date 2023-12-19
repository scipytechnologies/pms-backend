const Product = require("../models/ProductSchema")
const Pump = require("../models/PumpSchema")
module.exports={
  createProduct:async(req,res)=>{
    const {CategoryName,CategoryImage,Description,product}=req.body;
    try{
        const result=await Product.create({
            CategoryName,
            CategoryImage, 
            Description,
            product
        });
        try {
            await Pump.findByIdAndUpdate(req.params.id, {
                $push: {
                    Product: [{
                        ProductId: result._id,
                        ProductName: result.Name
                    }]
                }
            });
            res.status(200).json("success");
        }
        catch (err) {
            res.status(401).json({err});
        }

    }
    catch (err) {
        res.status(400).json({ err });
    }
},

   
getProduct:async(req,res)=>{
    const id=req.params.id
    try {
         const result1=await Product.find()
         res.status(200).json({result1});
    }
    catch(err) {
        res.status(400).json({err});
        } 
},
getProductById:async(req,res)=>{
    const id=req.params.id
    try {
         const result2=await Product.findById(id)
         res.status(200).json({result2});
    }
    catch(err) {
        res.status(400).json({err});
        }

    
},
updateProduct:async(req,res)=>{
    const id=req.params.id
    try {
         await Product.findByIdAndUpdate(id,{
            CategoryName:req.body.CategoryName,
            CategoryImage:req.body.CategoryImage,
            Description:req.body.Description,
            product:req.body.product
         });
         res.status(200).json("success");
    }
    catch(err) {
        res.status(400).json({err});
        }

    },
deleteProduct:async(req,res)=>{
        const id=req.params.id
        try {
             await Product.findByIdAndDelete(id)
             res.status(200).json("success");
        }
        catch(err) {
            res.status(400).json({err});
            }
    
        }}
    