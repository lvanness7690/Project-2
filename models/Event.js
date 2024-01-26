const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/connection');

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
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
    },
    attendees: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});

module.exports = Event;
