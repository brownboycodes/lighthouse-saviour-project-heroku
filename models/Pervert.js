const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pervertSchema = new Schema(
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

const Pervert = mongoose.model("Pervert", pervertSchema);

module.exports = Pervert;
