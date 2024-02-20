const mongoose = require('mongoose')
const Schema = mongoose.Schema
const historySchema = new Schema({
    Date: {
        type: String
    },
    Stock: {
        type: Number
    },
    Mode: {
        type: String
    },
    CurrentStock: {
        type: String
    },
    Note: {
        type: String
    }
})
const inventorymanagementDetailsSchema = new mongoose.Schema({

    // ⁡⁣⁣⁢ Basic Details⁡
    PumpId: {
        type: String,
        required: true
    },
    CategoryName: {
        type: String
    },
    SKUNo: {
        type: Number
    },
    ItemName: {
        type: String
    },
    CurrentStock: {
        type: Number
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
    InventoryHistory: [historySchema]
},
    { timestamps: true });
const Inventorymanagement = mongoose.model("inventorymanagement", inventorymanagementDetailsSchema);
module.exports = Inventorymanagement;