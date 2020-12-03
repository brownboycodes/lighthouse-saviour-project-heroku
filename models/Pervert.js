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

