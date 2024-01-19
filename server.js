const express = require("express");
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes')

const PORT = 3001;

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(userRoutes);

sequelize.sync({force: true }).then(() => {
    app.listen(PORT, () => {
        console.log('Server listening on PORT 3001');
    });
});
