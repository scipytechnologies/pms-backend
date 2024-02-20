const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FuelTestingSchema = new Schema(
  {
    EmployeeName: {
      type: String,
    },
    EmployeeId: {
      type: String,
    },
    Nozzle: {
      type: String,
    },
    NozzleId: {
      type: String,
    },
    Product: {
      type: String,
    },
    Opening: {
      type: String,
    },
    Closing: {
      type: String,
    },
    Quantity: {
      type: String,
    },
    TestResult: {
      type: Boolean,
    },
    Date: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = new mongoose.model("FuelTesting", FuelTestingSchema);
