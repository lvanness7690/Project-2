const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    // Add other fields as needed
});

module.exports = Event;
