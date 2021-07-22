const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const isolatedSchema = new Schema(
  {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Isolated = mongoose.model("Isolated", isolatedSchema);

module.exports = Isolated;