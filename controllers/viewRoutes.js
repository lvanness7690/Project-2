const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();
const bcrypt = require('bcrypt');
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

router.get('/login', (req, res) => {
    // Check if the user is already logged in
    if (req.session && req.session.user) {
      // If logged in, redirect to the events page
      res.redirect('/events', {logged_in: req.session.logged_in});
    } else {
      // If not logged in, render the login page
      res.render('login'); // Assuming 'login' is the name of your login.handlebars template
    }
  });

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username or email
        const user = await User.findOne({
            $or: [{ username }, { email: username }],
        });

        if (!user) {
            return res.status(401).send('Invalid username/email or password');
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid username/email or password');
        }

        // Set up session or generate token for authentication
        req.session.userId = user.id; // Save userId in session
        req.session.isLoggedIn = true;   // Mark the user as logged in

        // Redirect or send success response
        res.redirect('/events'); // Redirect to dashboard after successful login
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.redirect('/'); // Redirect to home page or another page on error
      }
  
      // Redirect the user after successfully destroying the session
      res.redirect('/login'); // Redirect to the login page
    });
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

    // Check if the event already exists in the Event model
    const existingEvent = await Event.findOne({
        where: { id: eventId}, // Adjust the condition based on your model
        include: [{
            model: User,
            as: 'users',
          }],
      });
  
      if (existingEvent) {
        // If the event exists, render the event details using your EJS template
        res.render('event', { event: existingEvent.toJSON() });
      } else {
        // If the event doesn't exist, create a new entry in the Event model
        const newEvent = await Event.create({
          id: eventId,
          name: eventData.name,
          date: eventData.dates.start.localDate,
          location: eventData._embedded?.venues[0]?.name,
          image: eventData.images[0]?.url,
          description: eventData.info,
        });
  
        // Render the event details using your EJS template
        res.render('event', { event: newEvent.toJSON() });
      }
  } catch (error) {
      console.error('Error fetching event details:', error);
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

router.post('/api/attend/:eventId', async (req, res) => {
  try {
      const { eventId } = req.params;
      const userId = req.session.userId; // Make sure this is being set when the user logs in

      if (!userId) {
          // If there is no user in session, send an unauthorized response
          return res.status(401).json({ message: 'User must be logged in to attend' });
      }

      // Record the user's attendance to the event
      await UserEvent.create({
          userId,
          eventId
      });

      // Send a JSON response indicating success
      res.json({ message: 'Attendance recorded' });
  } catch (error) {
      console.error('Error attending event:', error);
      // Send a server error response
      res.status(500).json({ error: 'Error attending event' });
  }
});

module.exports = router;
