const mongoose = require("mongoose")
const Schema = mongoose.Schema

const EvaporationSchema = new Schema ({
    Tank: {
        type: String
    },
    Tankid: {
        type: String
    },
    InitialQuantity: {
        type: String
    },
    ActualQuantity: {
        type: String
    },
    Missing: {
        type: String
    },
    Date: {
        type: Date
    },
    TestedBy: {
        type: String
    }
},
{ timestamps: true}
)
module.exports = new mongoose.model("Evaporation",EvaporationSchema)