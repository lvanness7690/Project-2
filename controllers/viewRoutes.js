// controllers/viewRoutes.js
// Handles routes for rendering views

const router = require('express').Router();
const { Event } = require('../models'); // Adjust as necessary

// Route for the home page
router.get('/', (req, res) => {
    res.render('home'); // Renders home.handlebars
});

// Route for the events page
router.get('/events', async (req, res) => {
    try {
        // Add logic here if you need to pass data to the events view
        // Example: const events = await Event.findAll();
        res.render('events'); // Renders events.handlebars
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
