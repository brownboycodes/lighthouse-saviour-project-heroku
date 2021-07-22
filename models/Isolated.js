/*
const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');

const Isolated = db.define(process.env.DB_TABLE1, {
    latitude: {
        type: DataTypes.STRING
    },
    longitude: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
});

Isolated.sync();
console.log("The table for the Isolated model was just created if it didn't exist before!");

module.exports = Isolated;
*/

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