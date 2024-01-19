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
    messages: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [], 
    },
});

module.exports = Event;
