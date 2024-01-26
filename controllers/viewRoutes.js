const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Ensure you have this line to use environment variables
const router = express.Router();
const { Event } = require('../models'); // Adjust as necessary

// Route for the home page
router.get('/', (req, res) => {
    res.render('home'); // Renders home.handlebars
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
        const apiKey = process.env.TICKETMASTER_API_KEY; // Replace with your Ticketmaster API Key

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
