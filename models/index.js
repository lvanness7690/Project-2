const sequelize = require('../config/connection'); // Import the sequelize instance
const User = require('./User')(sequelize);
const Event = require('./Event')(sequelize);

// Define associations here

module.exports = {
  User,
  Event,
};
