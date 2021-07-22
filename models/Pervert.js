/*
const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');

const Pervert = db.define(process.env.DB_TABLE3, {
    latitude: {
        type: DataTypes.STRING
    },
    longitude: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
});

Pervert.sync();
console.log("The table for the Pervert model was just created if it didn't exist before!");

module.exports = Pervert;
*/

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
