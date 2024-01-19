const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/api/events', async (req, res) => {
    try {
        // Fetch all events
        const events = await Event.findAll();

        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

