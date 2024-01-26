const express = require("express");
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session'); 
const routes = require('./controllers/index');
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001; // Use the Heroku provided port or default to 3001

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(routes);

//Sessions
app.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true,
  }));


  sequelize.sync({ force: true }).then(() => {
        // Start the server after the database connection is established
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        });
    });
