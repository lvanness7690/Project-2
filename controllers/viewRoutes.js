const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();
const { Event } = require('../models');
const session = require('express-session');

// Configure express-session
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Define the withAuth middleware
const withAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    // If the user is not logged in, redirect to the login page or do something else
    res.redirect('/login'); // You can replace '/login' with the actual login route
  } else {
    // User is logged in, proceed to the next middleware or route handler
    next();
  }
};

// Route for the home page
router.get('/', (req, res) => {
  // Check if the user is logged in
  if (req.session.isLoggedIn) {
    // User is logged in, you can redirect them to another page or do something else
    res.redirect('/events');
  } else {
    // User is not logged in, render the home page
    res.render('home'); // Renders home.handlebars
  }
});

// Route for the events page (protected with withAuth middleware)
router.get('/events', withAuth, async (req, res) => {
  try {
    res.render('events'); // Renders events.handlebars
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for searching events through the Ticketmaster API
router.get('/api/search-events', async (req, res) => {
  try {
    const city = req.query.city;
    const apiKey = process.env.TICKETMASTER_API_KEY;

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${encodeURIComponent(city)}`;

    const response = await axios.get(url);
    const events = response.data._embedded ? response.data._embedded.events : [];

    res.json(events);
  } catch (error) {
    console.error('Error fetching events from Ticketmaster:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
