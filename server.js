const express = require("express");
const { engine } = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Import connect-session-sequelize
const path = require('path');
const routes = require('./controllers'); // Importing aggregated routes
const sequelize = require('./config/connection');
require('dotenv').config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3001;
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Configure the session store to use Sequelize
const sessionStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds
    expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session
});

// Setup session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Use environment variable for the session secret
    store: sessionStore, // Tell express-session to use SequelizeStore
    resave: false, // Avoid resaving session if unmodified
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: { secure: process.env.NODE_ENV === "production" } // Use secure cookies in production
}));

// Sync the session store
sessionStore.sync();

// Use the aggregated routes from controllers
app.use(routes);

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
