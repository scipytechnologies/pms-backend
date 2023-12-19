const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema( 
    {    
      OpeningReading: {
        type: String,
        required: true,
      },
      ClosingReading: {
        type: String,
        required: true,
      },
      Quantity: {
        type: String,
        required: true,
      },
      NozzleId: {
        type: String,
        required: true,
      },
      NozzleName: {
        type: String,
        required: true,
      },
      Amount: {
        type: String,
        required: true,
      },
    });
    const DenominationSchema = new mongoose.Schema(
        {
      TwoK: {
        type: Number,
        required: true,
      },
      FiveH: {
        type: Number,
        required: true,
      },
      TwoH: {
        type: Number,
        required: true,
      },
      OneH: {
        type: Number,
        required: true,
      },
      FiveT: {
        type: Number,
        required: true,
      },
      TwoT: {
        type: Number,
        required: true,
      },
      Ten: {
        type: Number,
        required: true,
      },
      Five: {
        type: Number,
        required: true,
      },
      Two: {
        type: Number,
        required: true,
      },
      One: {
        type: Number,
        required: true,
      },

    });
    const PaymentMethodSchema = new mongoose.Schema(
        {
      Method: {
        type: String,
        required: true,
      },
      Amount: {
        type: String,
        required: true,
      },

    },
   
    );
const SalesAndBillingSchema = new mongoose.Schema(
    {
      Name: {
        type: String,
        required: true,
      },
      Shift: {
        type: String,
        required: true,
      },
      TotalAmount: {
        type: String,
        required: true,
      },
      ExcessAmount: {
        type: String,
        required: true,
      },
      Date: {
        type: String,
        required: true,
      },
      Dinomination:[DenominationSchema],
      Product:[ProductSchema],
      Paymentmethod:[PaymentMethodSchema],
    }, 
    { timestamps: true });
    
    module.exports = mongoose.model("SalesAndBilling", SalesAndBillingSchema);