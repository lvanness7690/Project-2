const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Attendee extends Model {}

Attendee.init({
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Events', // Name of the Event model
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // Name of the User model
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Attendee', // Add this line
});

module.exports = Attendee;
