const mongoose = require("mongoose")
const Schema = mongoose.Schema
const EcommerceSchema = new Schema({
    CategoryName: {
        type: String
    },
    ProductName: {
        type: String
    },
    Price: {
        type: String
    },
    Quantity: {
        type: String
    },
    TotalAmount: {
        type: String
    },
    PumpId: {
        type: String
    },
    ProductId: {
        type: String
    },
    CategoryId: {
        type: String
    },
    GST: {
        type: String
    }
})
const EcommerceSaleSchema = new mongoose.Schema({
    SalesId: {
        type: String
    },
    GST: {
        type: String
    },
    TotalSaleAmount: {
        type: String
    },
    EcommerceSale: [EcommerceSchema],

}, { timestamps: true });

module.exports = mongoose.model("Ecommerce", EcommerceSaleSchema)