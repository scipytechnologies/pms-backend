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
     
    },
    PANCardNumber: {
      type: String,
 
    },
    PFNumber: {
      type: String,
   
    },
    ESINumber: {
      type: String,
   
    },
    UAN: {
      type: String,
      
    },
    Designation: {
      type: String,
      required: true,
    },
    Department: {
      type: String,

    },
    Salary: {
      type: String,
      
    },
    Note: {
      type: String,
     
    },
    AccountNumber: {
      type: String,
      
    },
    IFSCCode: {
      type: String,
      
    },
    Branch: {
      type: String,
     
    },
    serialNumber: {
      type: String,
    },
    PumpId: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employee", EmployeeSchema);
