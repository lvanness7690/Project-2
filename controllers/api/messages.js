const express = require('express');
const router = express.Router();
const Event = require('../models/Event.js');
const User = require('../models/User.js');

router.post('/', async (req, res) => {
    try {
        const { content, userId, eventId } = req.body;

        // Find the event by ID
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Create a new message object
        const newMessage = {
            content,
            userId,
        };

        // Add the message to the event's messages array
        event.messages.push(newMessage);

        // Save the updated event with the new message
        await event.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error posting message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;