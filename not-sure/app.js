const express = require('express');
const session = require('express-session');
const { authenticate } = require('./middleware/authMiddleware');
const { getEvents } = require('./controllers/eventController');

const app = express();
const PORT = process.env.PORT || 3000;




app.get('/events/:city', authenticate, getEvents);


