const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
// Include User model if it's being used
const User = require('../models/User'); // Uncomment if User model is needed

// API route to fetch all events
router.get('/api/events', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to get attendees for a specific event
router.get('/api/events/:eventId/attendees', async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Assuming a relationship setup, fetching attendees
        const attendees = await User.findAll({
            where: { id: event.attendees },
        });

        res.status(200).json(attendees);
    } catch (error) {
        console.error('Error fetching attendees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to add an attendee to a specific event
router.post('/api/events/:eventId/attendees', async (req, res) => {
    const eventId = req.params.eventId;
    const { userId } = req.body;

    try {
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Logic for adding attendees (this might need adjustment based on your DB schema)
        if (!event.attendees.includes(userId)) {
            event.attendees.push(userId);
            await event.save();
        }

        res.status(201).json({ message: 'Attendee added successfully' });
    } catch (error) {
        console.error('Error adding attendee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// New route to render the 'events' page
router.get('/events', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.render('events', { events }); // Render 'events.handlebars' with the events data
    } catch (error) {
        console.error('Error rendering events page:', error);
        res.status(500).render('error', { error: 'Internal Server Error' }); // Ensure 'error.handlebars' exists
    }
});

module.exports = router;
