const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();
const session = require('express-session');

// Configure express-session
router.use(session({
  secret: process.env.SESSION_SECRET, // Make sure to have SESSION_SECRET in your .env file
  resave: false,
  saveUninitialized: true,
}));

// Route for the home page
router.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect('/events');
  } else {
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
    res.json(events);
  } catch (error) {
    console.error('Error fetching events from Ticketmaster:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for individual event details page
router.get('/event/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const apiKey = process.env.TICKETMASTER_API_KEY;
    const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}`;
    const response = await axios.get(url);
    const eventDetails = response.data;

    const event = {
      name: eventDetails.name,
      date: eventDetails.dates.start.localDate,
      location: eventDetails._embedded.venues[0].name,
      image: eventDetails.images[0].url,
      description: eventDetails.info,
    };

    res.render('event', { event }); // Renders event.handlebars with the event details
  } catch (error) {
    console.error('Error fetching event details from Ticketmaster:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add routes for other handlebars pages here if needed

module.exports = router;
