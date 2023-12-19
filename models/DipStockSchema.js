const mongoose = require("mongoose");
const TankDistributionSchema = new mongoose.Schema({
  Tank: {
    type: String,
  },
  Quantity: {
    type: String,
  },
});
const DipStockSchema = new mongoose.Schema(
  {
    Date: {
      type: Date,
    },
    InvoiceNumber: {
      type: String,
    },
    VehicleNumber: {
      type: String,
    },
    AgentName: {
      type: String,
    },
    Product: {
      type: String,
    },
    Quantity: {
      type: Number,
    },
    Price: {
      type: String,
    },
    Note: {
      type: String,
    },
    TotalQuantityFilled: {
      type: String,
    },
    RemainingQuantity: {
      type: String,
    },
    PhoneNumber: {
      type: String,
    },
    LFRAmount: {
      type: String,
    },
    Rate: {
      type: Date,
    },
    VAT: {
      type: Number,
    },
    Cess: {
      type: Number,
    },
    PumpId: {
      type: String,
      required: true,
    },
    TankDistribution: [TankDistributionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("dipStock", DipStockSchema);
