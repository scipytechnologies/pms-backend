const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    TotalQty: {
        type: String,
        required: true
    },
    TestQty: {
        type: String,
        required: true
    },
    FuelRate: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    }
})

const DailyreportSchema = new Schema({

    NozzleName: {
        type: String,
        required: true
    },
    Fuel: {
        type: String,
        required: true
    },
    OpeningReading: {
        type: String,
        required: true
    },
    ClosingReading: {
        type: String,
        required: true
    },
    products: [ProductSchema],
},
    { timestamps: true }
)
module.exports = mongoose.model("dailyreport", DailyreportSchema)