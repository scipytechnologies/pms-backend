const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    MSQty: {
        type: String,
        required: true
    },
    MSRate: {
        type: String,
        required: true
    },
    MSAmount: {
        type: String,
        required: true
    },
    XPQty: {
        type: String,
        required: true
    },
    XPRate: {
        type: String,
        required: true
    },
    XPAmount: {
        type: String,
        required: true
    },
    HSDQty: {
        type: String,
        required: true
    },
    HSDRate: {
        type: String,
        required: true
    },
    HSDAmount: {
        type: String,
        required: true
    },
    OilQty: {
        type: String,
        required: true
    },
    OilRate: {
        type: String,
        required: true
    },
    OilAmount: {
        type: String,
        required: true
    }
})

const MonthlyreportSchema = new Schema(
    {
        Date: {
            type: String,
            required: true
        },
        PacketOil: {
            type: String,
            required: true
        },
        TotalSale: {
            type: String,
            required: true
        },
        products: [ProductSchema],
    },
    { timestamps: true }
)
module.exports = mongoose.model("monthlyreport", MonthlyreportSchema)