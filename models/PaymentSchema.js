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
});
module.exports = mongoose.model("Payment", PaymentSchema);
