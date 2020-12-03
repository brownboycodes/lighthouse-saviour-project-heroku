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