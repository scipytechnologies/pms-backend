const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({

    // ⁡⁣⁣⁢ Basic Details⁡

    Name: {
        type: String
    },
    Description: {
        type: String
    },
    Category: {
        type: String
    },
    Tax: {
        type: Number
    },
    Brand: {
        type: String
    },

    // 
 
    Price: {
        type: Number
    },
    OnSale: {
        type: Boolean
    },
    Profit: {
        type: Number
    },
    Margin: {
        type: Number
    },
    SKU: {
        type: String
    },

});
const CategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String
    },
    CategoryImage: {
        type: String
    },
    Description: {
        type: String
    },
    product:[productSchema],
}, 
{ timestamps: true });

const Product = mongoose.model("category", CategorySchema);
module.exports = Product;