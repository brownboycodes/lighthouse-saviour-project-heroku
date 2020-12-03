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

module.exports = Pervert;

