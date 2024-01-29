const express = require('express');
const router = express.Router();
const { Event, Message, User } = require('../../models'); // Adjust the path as needed

// POST a new message to an event
router.post('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { content } = req.body;
    const userId = req.session.userId; // Assuming you have userId stored in the session

    // Check if the event and user exist
    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(userId);

    if (!event || !user) {
      return res.status(404).json({ error: 'Event or User not found' });
    }

    // Create a new message
    const newMessage = await Message.create({
      content: content,
      eventId: eventId,
      userId: userId, 
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

