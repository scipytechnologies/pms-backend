const mongoose = require("mongoose")
const Schema = mongoose.Schema
const CreditSalesSchema = new Schema(
    {
        Token: {
           type: String
        },
        VehicleNumber: {
            type: String
        },
        Product: {
            type: String
        },
        Quantity: {
            type: String
        },
        Price: {
            type: String
        },
        Amount: {
            type: String
        },
        Status: {
            type: String
        }

    }
)
module.exports = mongoose.model("CreditSales",CreditSalesSchema)