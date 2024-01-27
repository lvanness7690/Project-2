const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class UserEvent extends Model {}

UserEvent.init({
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users', // If your table name is 'users'
            key: 'id'
        }
    },
    eventId: {
        type: DataTypes.STRING,
        references: {
            model: 'events', // If your table name is 'events'
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'UserEvent',
    timestamps: false,
    underscored: true,
});

module.exports = UserEvent;
