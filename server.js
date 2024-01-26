// server.js
// Main file for setting up the Express server

const express = require("express");
const { engine } = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers'); // Importing aggregated routes
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Setup session middleware
app.use(session({
    secret: 'your_secret_key', // Change for production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

// Use the aggregated routes from controllers
app.use(routes);

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
