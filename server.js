const express = require("express");
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const db = require('./db.js');

const PORT = process.env.PORT || 3001; // Use the Heroku provided port or default to 3001

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(userRoutes);

//Sessions
app.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true,
  }));


  sequelize.sync({ force: true }).then(() => {
    // Use the database pool to execute queries
    db.query('SELECT 1 + 1 AS result', (error, results, fields) => {
        if (error) {
            console.error('Error connecting to the database:', error);
        } else {
            console.log('Connected to the database successfully');
        }

        // Start the server after the database connection is established
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        });
    });
});
