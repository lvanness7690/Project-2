const mysql = require('mysql2');
const url = require('url'); // Require the URL module to parse the JAWSDB_URL

let pool;

if (process.env.JAWSDB_URL) {
    // If running on Heroku with JAWSDB_URL set, parse the database URL
    const dbUrl = new URL(process.env.JAWSDB_URL); // Parse the JAWSDB_URL

    // Extract the various components from the JAWSDB_URL
    const dbConfig = {
        connectionLimit: 10,
        host: dbUrl.hostname,
        user: dbUrl.username,
        password: dbUrl.password,
        database: dbUrl.pathname.slice(1) // Remove the leading '/'
    };

    // Create a MySQL pool with the extracted configuration
    pool = mysql.createPool(dbConfig);
} else {
    // Fallback for local development with individual environment variables
    pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'L3!ght@n',
        database: process.env.DB_DATABASE || 'user_db'
    });
}

module.exports = pool;
