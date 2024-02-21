const Product = require("../models/ProductSchema");
const Pump = require("../models/PumpSchema");
const { v4: uuidv4 } = require("uuid");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const secretAccessKey = "lQKgdEFzbDjhCIamp+ZJD14utqiIcqo8V2/dxtn/";
const accessKeyId = "AKIA4MTWGXBSZ3AKH372";
const s3Client = new S3Client({
  // Set your AWS credentials and region here
  region: "ap-south-1",
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
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
      });
      try {
        await Pump.findByIdAndUpdate(req.params.id, {
          $push: {
            Product: [
              {
                ProductId: result._id,
                CategoryName: result.CategoryName,
                Description: result.Description,
              },
            ],
          },
        });
        res.status(200).json("success");
      } catch (err) {
        res.status(401).json({ err });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  getProduct: async (req, res) => {
    const id = req.params.id;
    try {
      const result1 = await Product.find();
      res.status(200).json({ result1 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getProductById: async (req, res) => {
    const id = req.params.id;
    try {
      const result2 = await Product.findById(id);
      res.status(200).json({ result2 });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        Name,
        ProductDescription,
        Category,
        Tax,
        Brand,
        Price,
        OnSale,
        Profit,
        Margin,
        SKU,
      } = req.body;
      const file = req.file;
      const productId = req.params.id;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      const key = `Product/${uuidv4()}-${file.originalname}`;
      const putObjectParams = {
        Bucket: "indhanxbucket",
        Key: key,
        Body: file.buffer,
      };

      await s3Client.send(new PutObjectCommand(putObjectParams));

      const imageURL = `https://s3.amazonaws.com/indhanxbucket/${key}`;

      const updatedProduct = {
        Name,
        ProductDescription,
        Category,
        Tax,
        Brand,
        Price,
        // OnSale,
        Profit,
        Margin,
        SKU,
        imageURL,
      };
      try {
        const result = await Product.findByIdAndUpdate(productId, {
          $push: {
            product: [
              {
                Name: Name,
                ProductDescription: ProductDescription,
                Category: Category,
                Tax: Tax,
                Brand: Brand,
                Price: Price,
                // OnSale,
                Profit: Profit,
                Margin: Margin,
                SKU: SKU,
                imageURL: imageURL,
              },
            ],
          },
        });
        res.status(200).json({result});
      } catch (err) {
        res.status(401).json({ err });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProduct: async (req, res) => {
    const categoryId = req.params.categoryId;
    const productId = req.params.id;
    console.log("cate", categoryId);
    console.log("prod", productId);
    try {
      const productdata = await Product.findOneAndUpdate(
        { _id: categoryId },
        {
          $pull: {
            product: { _id: productId },
          },
        }
      );
      if (
        !productdata ||
        !productdata.product ||
        productdata.product.length === 0
      ) {
        return res
          .status(404)
          .json({ error: "Category or Product not found or already deleted" });
      }
      res.status(200).json({ productdata });
    } catch (err) {
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
        const updatedProductData = nestedproduct;
        if (updatedProductData.OnSale && updatedProductData.OnSale == true) {
          updatedProductData.OnSale = false;
        } else {
          updatedProductData.OnSale = true;
        }
        Object.assign(nestedproduct, updatedProductData);

        await object.save();

        res.send("Object updated successfully");
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  deleteCategory: async (req, res) => {
    const pumpid = req.params.pumpid;
    const id = req.params.id;
    try {
      const deletecategory = await Product.findByIdAndDelete(id);
      if (!deletecategory) {
        res.status(404).json("Category Not Found");
      }
      const pumpUpdate = await Pump.findByIdAndUpdate(pumpid, {
        $pull: {
          Product: { ProductId: deletecategory._id },
        },
      });
      if (!pumpUpdate) {
        return res
          .status(500)
          .json({ error: "Failed to update Pump collection" });
      }
      res.status(200).json({ deletecategory });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
