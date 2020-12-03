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




