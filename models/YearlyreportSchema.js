const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const yearlyreportSchema = new Schema({
  Year:{
    type:String,
    required:true
  },
  MSQty:{
    type: String,
    required: true
  },

})
module.exports = mongoose.model("yearlyreport", yearlyreportSchema) 