const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
  {
    value: {
      type: String,
    }
}
);

module.exports = mongoose.model("token", TokenSchema);