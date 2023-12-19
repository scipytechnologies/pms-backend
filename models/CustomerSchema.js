const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CustomerSchema = new Schema(
    {
        Category: {
            type: String,
            required: true,
        },
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
        // HomePhoneNo: {
        //     type: String,
        //     required: true,
        // },
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
        ExpenseAccount: {
            type: Number,
            required: true,
        },
        DealerCard: {
            type: Boolean,
            required: true,
        },
        CardAccount: {
            type: Boolean,
            required: true,
        },
        ExpenseAsCredit: {
            type: Boolean,
            required: true,
        },
        HideFromDR: {
            type: Boolean,
            required: true,
        },
        Type: {
            type: String,
            required: true,
        },
        Operator: {
            type: Boolean,
            required: true,
        },
        Active: {
            type: Boolean,
            required: true,
        },
    }

);
module.exports = mongoose.model("Customer", CustomerSchema);