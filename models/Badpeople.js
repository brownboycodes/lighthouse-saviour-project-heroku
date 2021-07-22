/*
const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');

const Badpeople = db.define(process.env.DB_TABLE2, {
    latitude: {
        type: DataTypes.STRING
    },
    longitude: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
});

Badpeople.sync();
console.log("The table for the Badpeople model was just created if it didn't exist before!");

module.exports = Badpeople;
*/
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


