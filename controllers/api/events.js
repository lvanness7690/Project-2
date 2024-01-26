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

// Get attendees for a specific event
router.get('/api/events/:eventId/attendees', async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const attendees = await User.findAll({
            where: { id: event.attendees },
        });

        res.status(200).json(attendees);
    } catch (error) {
        console.error('Error fetching attendees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add an attendee to a specific event
router.post('/api/events/:eventId/attendees', async (req, res) => {
    const eventId = req.params.eventId;
    const { userId } = req.body;

    try {
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if the user is not already an attendee
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


module.exports = router;