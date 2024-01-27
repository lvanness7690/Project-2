const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init({
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
}, {
    sequelize,
    modelName: 'Event',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
});

module.exports = Event;
