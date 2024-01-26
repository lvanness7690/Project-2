// controllers/api/messages.js
// Handles routes related to message operations on events

const express = require('express');
const router = express.Router();
const { Event } = require('../../models'); // Correct path assuming standard Express project structure

// POST a new message to an event
router.post('/', async (req, res) => {
    const { content, userId, eventId } = req.body;

    try {
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Assuming messages is a JSON field, and you're appending new messages to it
        const newMessage = { content, userId };
        event.messages = [...event.messages, newMessage];

        await event.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error posting message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
