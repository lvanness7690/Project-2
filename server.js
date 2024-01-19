const express = require("express");
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(userRoutes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on: http://localhost:${PORT}`);
    });
});
