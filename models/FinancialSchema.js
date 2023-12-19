const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("employee", EmployeeSchema);