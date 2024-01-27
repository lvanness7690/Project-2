const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();
const session = require('express-session');
const { User, Event, UserEvent } = require('../models'); // Import models

// Configure express-session
router.use(session({
    secret: process.env.SESSION_SECRET, // Secret key for session, ideally kept in .env file
    resave: false,
    saveUninitialized: true,
}));

// Route for the home page
router.get('/', (req, res) => {
    if (req.session.userId) {
        // Redirect to events if user is logged in
        res.redirect('/events');
    } else {
        // Render the home page for non-logged-in users
        res.render('home');
    }
});

// Route for the events page
router.get('/events', async (req, res) => {
    try {
        // Render the events page
        res.render('events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for searching events through the Ticketmaster API
router.get('/api/search-events', async (req, res) => {
    try {
        const city = req.query.city; // Get city from the query parameter
        const apiKey = process.env.TICKETMASTER_API_KEY;
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${encodeURIComponent(city)}`;
        const response = await axios.get(url);
        const events = response.data._embedded ? response.data._embedded.events : [];
        res.json(events); // Send back the events data as JSON
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for individual event details
router.get('/event/:eventId', async (req, res) => {
  try {
      const eventId = req.params.eventId;
      const apiKey = process.env.TICKETMASTER_API_KEY;
      const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}`;
      const response = await axios.get(url);
      const eventData = response.data;

      // Reformat the event data to match the expected structure in the Handlebars template
      const event = {
          name: eventData.name,
          date: eventData.dates.start.localDate,
          location: eventData._embedded?.venues[0]?.name,
          image: eventData.images[0]?.url,
          description: eventData.info,
          id: eventId  // Add the event ID for use in the attending button
      };

      res.render('event', { event });
  } catch (error) {
      console.error('Error fetching event details:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Route for attending an event
router.post('/api/attend/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.session.userId; // Get user ID from session
        await UserEvent.create({ userId, eventId }); // Create a record in UserEvent table
        res.json({ message: 'Attendance recorded' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for the user's dashboard page
router.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.userId) {
            // Redirect to home page if user is not logged in
            res.redirect('/');
            return;
        }

        // Fetch all events associated with the user
        const userEvents = await UserEvent.findAll({
            where: { userId: req.session.userId },
            include: [Event] // Include Event data in the query
        });

        const events = userEvents.map(ue => ue.Event.get({ plain: true }));
        res.render('dashboard', { events }); // Render the dashboard page with user's events
    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
