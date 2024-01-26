// models/Event.js
// Sequelize model definition for Events

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection'); // Corrected path to match your connection.js file

class Event extends Model {}

Event.init({
    // Model attributes are defined here
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
        defaultValue: [],
    },
    // MySQL does not support the ARRAY type. This needs to be changed to JSON or another approach
    // such as a join table if you're using MySQL.
    attendees: {
        type: DataTypes.JSON, // Changed from ARRAY to JSON for MySQL compatibility
        allowNull: true,
        defaultValue: [],
    },
}, {
    sequelize,
    modelName: 'Event',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
});

module.exports = Event;
