const mysql = require('mysql2');

// Create a MySQL pool to handle database connections
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.JAWSDB_URL || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'L3!ght@n',
  database: process.env.DB_DATABASE || 'user_db',
});

module.exports = pool;
