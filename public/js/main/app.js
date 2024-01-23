const express = require('express');
const session = require('express-session');
const { authenticate } = require('./middleware/authMiddleware');
const { getEvents } = require('./controllers/eventController');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true,
}));

app.get('/events/:city', authenticate, getEvents);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
