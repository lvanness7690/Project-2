const express = require("express");
const { engine } = require('express-handlebars');
const path = require('path'); 
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3001; // Use the PORT environment variable if available

const app = express();

app.use(express.json());

// Set up Handlebars view engine
app.engine('handlebars', engine({
    defaultLayout: 'main', // Specify the name of your default layout
    layoutsDir: './views/layout/main'
}));
app.set('view engine', 'handlebars');
app.set('views', './views'); // Specify the directory for view files

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use your routes
app.use(userRoutes);

// Sync Sequelize models to the database and start the server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    });
});
