const User = require('./User');
const Event = require('./Event');
const UserEvent = require('./UserEvent');

// Define associations here
User.belongsToMany(Event, { through: UserEvent, foreignKey: 'userId' });
Event.belongsToMany(User, { through: UserEvent, foreignKey: 'eventId' });

// These associations allow you to include Event when querying UserEvent
UserEvent.belongsTo(User, { foreignKey: 'userId' });
UserEvent.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = { User, Event, UserEvent };
