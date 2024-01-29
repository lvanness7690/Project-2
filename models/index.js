const User = require('./User');
const Event = require('./Event');
const UserEvent = require('./userEvent');
const Message = require('./Message');

// Define associations here
User.belongsToMany(Event, { through: UserEvent, foreignKey: 'userId' });
Event.belongsToMany(User, { through: UserEvent, foreignKey: 'eventId', as: 'users', });

// These associations allow you to include Event when querying UserEvent
UserEvent.belongsTo(User, { foreignKey: 'userId' });
UserEvent.belongsTo(Event, { foreignKey: 'eventId' });

Event.hasMany(Message, {
    foreignKey: 'event_id',
    onDelete: 'NO ACTION'
  });
  
Message.belongsTo(Event, {
    foreignKey: 'event_id'
  });

module.exports = { User, Event, UserEvent };
