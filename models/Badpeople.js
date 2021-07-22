const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const badPeopleSchema = new Schema(
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

const Badpeople = mongoose.model("Badpeople", badPeopleSchema);

module.exports = Badpeople;


