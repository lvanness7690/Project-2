const Sequelize = require("sequelize");
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Use the Heroku DATABASE_URL if it's available
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql', // or 'postgres' for PostgreSQL
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // For PostgreSQL with SSL
      },
    },
  });
} else {
  // Use your local database configuration
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;
