const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');

const RapePorn = db.define(process.env.DB_TABLE4, {
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    latitude: {
        type: DataTypes.STRING
    },
    longitude: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
});

module.exports = RapePorn;
