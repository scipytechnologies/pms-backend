const mongoose = require('mongoose')
const inventorymanagementDetailsSchema = new mongoose.Schema({

    // ⁡⁣⁣⁢ Basic Details⁡

    SKUNo: {
        type: Number
    },
    ItemName: {
        type: String
    },
    ItemCategory: {
        type: String
    },
    CurrentStock: {
        type: String
    },
    Price: {
        type: String
    },
    Brand: {
        type: String
    },
    ExpiryDate: {
        type: String
    },
    Description: {
        type: String
    },
    // Tax: {
    //     type: Number
    // },
    // HSNCode: {
    //     type: String
    // },
    // BuyOrSell: {
    //     type: String
    // },
},
{ timestamps: true });
const Inventorymanagement = mongoose.model("inventorymanagement", inventorymanagementDetailsSchema);
module.exports = Inventorymanagement;