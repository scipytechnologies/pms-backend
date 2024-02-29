const Product = require("../models/ProductSchema")
const Pump = require("../models/PumpSchema")
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require("fs");


const s3Client = new S3Client({
    region: "ap-south-1", // Add your AWS region
    credentials: {
      accessKeyId: "AKIA4MTWGXBS7NF7QF5Z",
      secretAccessKey: "ipAbi9RTDiTfWXW6EgR3mLmzZQPqxvbvjo5jKD5O",
    },
  });
  
module.exports = {
    createProduct: async (req, res) => {
        const { CategoryName, CategoryImage, Description, product } = req.body;
        try {
            const result = await Product.create({
                CategoryName,
                CategoryImage,
                Description,
                product,
                PumpID:req.params.id
            });
            try {
                await Pump.findByIdAndUpdate(req.params.id, {
                    $push: {
                        Product: [{
                            ProductId: result._id,
                            CategoryName: result.CategoryName,
                            Description: result.Description
                        }]
                    }
                });
                res.status(200).json("success");
            }
            catch (err) {
                res.status(401).json({ err });
            }

        }
        catch (err) {
            res.status(400).json({ err });
        }
    },


    getProduct: async (req, res) => {
        const id = req.params.id
        try {
            const result1 = await Product.find({PumpID:id})
            res.status(200).json({ result1 });
        }
        catch (err) {
            res.status(400).json({ err });
        }
    },
    getProductById: async (req, res) => {
        const id = req.params.id
        try {
            const result2 = await Product.findById(id)
            res.status(200).json({ result2 });
        }
        catch (err) {
            res.status(400).json({ err });
        }


    },
    updateProduct: async (req, res) => {
        const categoryId = req.params.id;
        try {
            const newProduct = {
                Name: req.body.Name,
                ProductDescription: req.body.ProductDescription,
                Category: req.body.Category,
                Tax: req.body.Tax,
                Brand: req.body.Brand,
                Price: req.body.Price,
                OnSale: req.body.OnSale,
                Profit: req.body.Profit,
                Margin: req.body.Margin,
                SKU: req.body.SKU,
                image: req.file.originalname
            };

            const updatedCategory = await Product.findByIdAndUpdate(categoryId, {
                $push: {
                    product: newProduct
                }
            }, { new: true });
            if (!req.file) {
                res.status(200).json(updatedCategory);
              } else {
                const fileContent = fs.readFileSync(req.file.path);
                console.log(fileContent);
                const params = {
                  Bucket: "indhanximages",
                  Key: req.file.originalname,
                  Body: fileContent,
                };
                const uploadCommand = new PutObjectCommand(params);
                await s3Client.send(uploadCommand);
                res.status(200).json(updatedCategory);
              }
        } catch (err) {
            res.status(401).json({ err });
        }
    },


    deleteProduct: async (req, res) => {
        const categoryId = req.params.categoryId
        const productId = req.params.id
        console.log("cate", categoryId)
        console.log("prod", productId)
        try {
            const productdata = await Product.findOneAndUpdate(
                { _id: categoryId },
                {
                    $pull: {
                        product: { _id: productId }
                    },
                },
            )
            if (!productdata || !productdata.product || productdata.product.length === 0) {
                return res.status(404).json({ error: 'Category or Product not found or already deleted' });
            }
            res.status(200).json({ productdata });
        }
        catch (err) {
            res.status(400).json({ err });
        }

    },
    onSales: async (req, res) => {
        const cat = req.params.cat;
        const id = req.params.id;
        const pumpid = req.params.pumpid;
        console.log(id);
        try {
            const object = await Product.findById(cat);
            if (!object) {
                return res.status(404).send("Object not found");
            } else {


                const nestedproduct = object.product.find(
                    (nestedObj) => nestedObj._id == id
                );

                if (!nestedproduct) {
                    return res.status(404).send("Nested object not found");
                }
                //   // Update the customer's data with the provided updatedCustomerData
                const updatedProductData = nestedproduct
                if (updatedProductData.OnSale && updatedProductData.OnSale == true) {
                    updatedProductData.OnSale = false
                } else {
                    updatedProductData.OnSale = true
                }
                Object.assign(nestedproduct, updatedProductData);

                await object.save();

                res.send("Object updated successfully");
            }
        } catch (err) {
            res.status(400).json({ err });
        }
    },
    deleteCategory: async (req,res) => {
        const pumpid = req.params.pumpid
        const id = req.params.id
        try {
            const deletecategory = await Product.findByIdAndDelete(id)
            if(!deletecategory) {
                res.status(404).json("Category Not Found")
            }
            const pumpUpdate = await Pump.findByIdAndUpdate(
                pumpid,
                {
                    $pull : {
                        Product: { ProductId: deletecategory._id }
                    }
                }
            )
            if (!pumpUpdate) {
                return res.status(500).json({ error: "Failed to update Pump collection" });
            }
            res.status(200).json({ deletecategory })
            
        }
        catch(err) {
            res.status(400).json({ err })
        }
    }
}
