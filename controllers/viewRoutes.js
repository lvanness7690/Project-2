const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios'); //Install this dependency
require('dotenv').config();


router.get('/',  (req, res) => {
  try {

    // Pass serialized data and session flag into template
    res.render('home', {  
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/events', async (req, res) => {
  try {
    const city = req.query.city; // Get city from query parameters
    const keyword = req.query.keyword; // Get keyword from query parameters

    if (!city && !keyword) {
      return res.status(400).json({ error: 'City or keyword is required.' });
    }

    let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}`;

    if (city) {
      apiUrl += `&city=${city}`;
    }

    if (keyword) {
      apiUrl += `&keyword=${keyword}`;
    }

    // Make a request to the Ticketmaster API
    const response = await axios.get(apiUrl);

    const thirdPartyEvents = response.data._embedded ? response.data._embedded.events : [];

    // Process each event from the third-party API
    for (const thirdPartyEvent of thirdPartyEvents) {
      // Check if the event already exists in the Event model
      const existingEvent = await Event.findOne({
        where: { eventId: thirdPartyEvent.id }, // Adjust the condition based on your model
      });

      if (existingEvent) {
        // If the event exists, use the existing data
        console.log('Event already exists:', existingEvent.toJSON());
      } else {
        // If the event doesn't exist, create a new entry in the Event model
        const newEvent = await Event.create({
          eventId: thirdPartyEvent.id,
          // Map other attributes from thirdPartyEvent to your model
          // For example: title: thirdPartyEvent.title, description: thirdPartyEvent.description, ...
        });
        console.log('New event created:', newEvent.toJSON());
      }
    }

    // Retrieve all events from the Event model
    const eventsData = await Event.findAll();

    // Transform Sequelize model data
    const events = eventsData.map((event) => event.get({ plain: true }));

    res.render('events', {events });
  } catch (error) {
    console.error('Error searching for or processing events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/events');
      return;
    }
  
    res.render('login');
  });


module.exports = router;