const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const eventsRoutes = require('./events.js');
const messageRoutes = require('./messages.js');

router.use('/api/user', userRoutes);
router.use('/api/events', eventsRoutes);
router.use('/api/messages', messageRoutes);

module.exports = router;
