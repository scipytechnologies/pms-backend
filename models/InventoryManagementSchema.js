const mongoose = require('mongoose')
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
    }
},
    { timestamps: true });
const Inventorymanagement = mongoose.model("inventorymanagement", inventorymanagementDetailsSchema);
module.exports = Inventorymanagement;