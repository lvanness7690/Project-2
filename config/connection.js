const Sequelize = require("sequelize");
require('dotenv').config();

let sequelize;

// Check if running on Heroku with JAWSDB_URL set
if (process.env.JAWSDB_URL) {
    // Use the JAWSDB_URL for Sequelize
    sequelize = new Sequelize(process.env.JAWSDB_URL, {
        dialect: 'mysql',
    });
} else {
    // Fallback to local database settings
    sequelize = new Sequelize(
        process.env.DB_NAME,       // Database name
        process.env.DB_USER,       // User
        process.env.DB_PASSWORD,   // Password
        {
            host: "localhost",     // Localhost for local development
            dialect: 'mysql',      // Assuming MySQL
            port: 3306,            // Default MySQL port
        }
    );
}

module.exports = sequelize;
