const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    TemporaryAddress: {
      type: String,
      required: true,
    },
    PermanentAddress: {
      type: String,
      required: true,
    },
    AadhaarId: {
      type: String,
      required: true,
    },
    VoterId: {
      type: String,
      required: true,
    },
    PANCardNumber: {
      type: String,
      required: true,
    },
    PFNumber: {
      type: String,
      required: true,
    },
    ESINumber: {
      type: String,
      required: true,
    },
    UAN: {
      type: String,
      required: true,
    },
    Designation: {
      type: String,
      required: true,
    },
    Department: {
      type: String,
      required: true,
    },
    Salary: {
      type: String,
      required: true,
    },
    Note: {
      type: String,
      required: true,
    },
    AccountNumber: {
      type: String,
      required: true,
    },
    IFSCCode: {
      type: String,
      required: true,
    },
    Branch: {
      type: String,
      required: true,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("employee", EmployeeSchema);