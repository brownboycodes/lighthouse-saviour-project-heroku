const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rapePornSchema = new Schema(
  {
    city: {
        type: String,
      required: true,
    },
    state: {
        type: String,
      required: true,
    },
    country: {
        type: String,
      required: true,
    },
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

const RapePorn = mongoose.model("RapePorn", rapePornSchema);

module.exports = RapePorn;

