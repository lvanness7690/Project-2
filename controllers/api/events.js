// controllers/api/events.js
// Handles routes related to event operations

const express = require('express');
const router = express.Router();
const { Event, User } = require('../../models'); // Correct path assuming standard Express project structure

// GET all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get attendees for a specific event
router.get('/:eventId/attendees', async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const event = await Event.findByPk(eventId, {
            include: [{ model: User }] // Assuming there's an association set up to include users
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Assuming that `attendees` is a properly formatted JSON field or association
        res.status(200).json(event.attendees);
    } catch (error) {
        console.error('Error fetching attendees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add an attendee to a specific event
router.post('/:eventId/attendees', async (req, res) => {
    const eventId = req.params.eventId;
    const userId = req.session.userId;

    try {
        // Assuming there's a many-to-many relationship between Events and Users
        const user = await User.findByPk(userId);
        const event = await Event.findByPk(eventId);

        if (!event || !user) {
            return res.status(404).json({ error: 'Event or User not found' });
        }

        // Add the user as an attendee
        await event.addUser(user); // This method is automatically created by Sequelize for many-to-many relations

           // Get the updated event with attendees
        const updatedEvent = await Event.findOne({
        where: { id: eventId },
        include: [{ model: User, as: 'users', attributes: ['id', 'username'] }], // Include attendees in the response
        });

        res.status(201).json({ message: 'Attendee added successfully' });
    } catch (error) {
        console.error('Error adding attendee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
