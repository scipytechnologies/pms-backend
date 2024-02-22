const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CustomerSchema = new Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        Address: {
            type: String,
            required: true,
        },
        MobileNo: {
            type: String,
            required: true,
        },
        GSTIN: {
            type: String,
            required: true,
        },
        OfficePhoneNo: {
            type: String,
            required: true,
        },
        EmailID: {
            type: String,
            required: true,
        },
        CreditBalance: {
            type: Number,
            required: true,
        },
        CreditLimit: {
            type: Number,
            required: true,
        },
        Note: {
            type: String,
            required: true
        },
        serialNumber: {
          type: Number,
          required: true,
        },
    },
    { timestamps: true }

);
module.exports = mongoose.model("Customer", CustomerSchema);