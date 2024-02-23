const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EcommerceSchema = new Schema({
  CategoryName: {
    type: String,
  },
  Name: {
    type: String,
  },
  Price: {
    type: String,
  },
  Quantity: {
    type: String,
  },
  Total: {
    type: String,
  },
  ProductId: {
    type: String,
  },
});
const EcommerceSaleSchema = new mongoose.Schema(
  {
    SalesId: {
      type: String,
    },
    PumpId: {
      type: String,
    },
    GST: {
      type: String,
    },
    TotalSaleAmount: {
      type: String,
    },
    EcommerceSale: [EcommerceSchema],
    serialNumber: {
      type: String,
    },
    PumpId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ecommerce", EcommerceSaleSchema);
