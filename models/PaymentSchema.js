const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
  CustomerID: {
    type: String,
  },
  Amount: {
    type: String,
  },
  Balance: {
    type: String,
  },
  Customer: {
    type: String,
  },
  PumpID: {
    type: String,
  },
},
{timestamps:true});
module.exports = mongoose.model("Payment", PaymentSchema);
