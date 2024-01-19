const express = require("express");
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Set up Handlebars view engine
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Point to your views directory

app.use(userRoutes);

// Use the environment variable PORT or default to port 3001 if not available
const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    });
});
