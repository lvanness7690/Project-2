const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();
const session = require('express-session');

// Configure express-session
router.use(session({
  secret: 'your-secret-key', // Change this to a more secure secret
  resave: false,
  saveUninitialized: true,
}));

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

// Route for the events page
router.get('/events', async (req, res) => {
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

    res.render('events', { events }); // Renders events.handlebars with the search results
  } catch (error) {
    console.error('Error fetching events from Ticketmaster:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for event details page
router.get('/events/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const apiKey = process.env.TICKETMASTER_API_KEY;

    // Fetch event details from the Ticketmaster API based on eventId
    const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}`;
    const response = await axios.get(url);
    const eventDetails = response.data || {}; // Event details from Ticketmaster API

    // Render the event.handlebars template with the fetched event details
    res.render('event', { event: eventDetails });
  } catch (error) {
    console.error('Error fetching event details from Ticketmaster:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
