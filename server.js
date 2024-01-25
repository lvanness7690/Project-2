const express = require("express");
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const eventsRoutes = require('./routes/events');

const PORT = process.env.PORT || 3001;

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Initialize session middleware
app.use(session({
    secret: 'your secret key', // Replace with a real secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' } // 'auto' or true if using HTTPS
}));

// Use routes
app.use(userRoutes);
app.use(eventsRoutes); // Add this line to use the events routes

// Establish Model Relationships
// Assuming you have an index.js in your models directory that sets up relationships
require('./models'); 

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    });
});
