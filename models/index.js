const User = require('./User');
const Event = require('./Event');

User.belongsToMany(Event, { through: 'User_Events' });
Event.belongsToMany(User, { through: 'User_Events' });

