const { Sequelize } = require('sequelize');


const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        useRTC: false
    },
    timezone: '+05:30'
});

// const db = new Sequelize(process.env.DATABASE_URL);

module.exports = db;

