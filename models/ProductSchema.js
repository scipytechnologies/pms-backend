const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  // ⁡⁣⁣⁢ Basic Details⁡

  Name: {
    type: String,
  },
  ProductDescription: {
    type: String,
  },
  Category: {
    type: String,
  },
  GST: {
    type: Number,
  },
  Brand: {
    type: String,
  },

  //

  Price: {
    type: Number,
  },
  OnSale: {
    type: Boolean,
  },
  Profit: {
    type: Number,
  },
  Margin: {
    type: Number,
  },
  SKU: {
    type: String,
  },
  image: {
    type: String,
  },
});
const CategorySchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
    },
    CategoryImage: {
      type: String,
    },
    Description: {
      type: String,
    },
    product: [productSchema],
    PumpID: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("category", CategorySchema);
module.exports = Product;
