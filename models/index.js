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

User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, {
    foreignKey: 'userId',
  });

module.exports = { User, Message, Event, UserEvent};
