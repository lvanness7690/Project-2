// models/Message.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {}

Message.init({
    // Message fields
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // Foreign key to Event
    eventId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Event',
            key: 'id'
        }
    },
    // Foreign key to User (if you want to track who posted the message)
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Message',
    timestamps: true, // If you want to track when messages were created/updated
    freezeTableName: true,
    underscored: true,
});

module.exports = Message;
