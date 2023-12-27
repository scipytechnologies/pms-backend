const mongoose = require("mongoose")
const Schema = mongoose.Schema;

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
},
    { timestamps: true }
)
module.exports = mongoose.model("dailyreport", DailyreportSchema)