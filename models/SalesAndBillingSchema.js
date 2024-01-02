const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    Opening: {
      type: String
    },
    Closing: {
      type: String
    },
    Quantity: {
      type: String
    },
    NozzleId: {
      type: String
    },
    NozzleName: {
      type: String
    },
    Amount: {
      type: String
    },
    Price: {
      type: String,
      required: true
    },
    Product: {
     type: String,
     required: true
    }
  });
const DenominationSchema = new mongoose.Schema(
  {
    TwoK: {
      type: Number
    },
    FiveH: {
      type: Number
    },
    TwoH: {
      type: Number
    },
    OneH: {
      type: Number
    },
    FiveT: {
      type: Number
    },
    TwoT: {
      type: Number
    },
    Ten: {
      type: Number
    },
    Five: {
      type: Number
    },
    Two: {
      type: Number
    },
    One: {
      type: Number
    },

  });
const CardPaymentSchema = new mongoose.Schema(
  {
    Machine: {
      type: String
    },
    Price: {
      type: String
    },

  });
const UpiPaymentSchema = new mongoose.Schema(
  {
    Upiprovider: {
      type: String
    },
    Price: {
      type: String
    },

  });
const OtherPaymentSchema = new mongoose.Schema(
  {
    Method: {
      type: String
    },
    Price: {
      type: String
    }
  }
)
const SalesAndBillingSchema = new mongoose.Schema(
  {
    PumpId:{
      type:String,
      required: true
    },
    Employee: {
      type: String
    },
    EmployeeId: {
      type: String,
      required: true
    },
    Shift: {
      type: String
    },
    TotalAmount: {
      type: String
    },
    ExcessAmount: {
      type: String
    },
    Date: {
      type: String
    },
    Dinomination: [DenominationSchema],
    Product: [ProductSchema],
    Cardpayment: [CardPaymentSchema],
    Upipayment: [UpiPaymentSchema],
    Otherpayment: [OtherPaymentSchema]
  },
  { timestamps: true });

module.exports = mongoose.model("SalesAndBilling", SalesAndBillingSchema);