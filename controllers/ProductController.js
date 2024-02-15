const Product = require("../models/ProductSchema")
const Pump = require("../models/PumpSchema")
module.exports = {
    createProduct: async (req, res) => {
        const { CategoryName, CategoryImage, Description, product } = req.body;
        try {
            const result = await Product.create({
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
            const result1 = await Product.find()
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
                SKU: req.body.SKU
            };
    
            const updatedCategory = await Product.findByIdAndUpdate(categoryId, {
                $push: {
                    product: newProduct
                }
            }, { new: true }); 
    
            res.status(200).json(updatedCategory);
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
              if(updatedProductData.OnSale && updatedProductData.OnSale ==true){
                updatedProductData.OnSale = false
              }else{
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
}
