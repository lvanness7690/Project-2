const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventsRoutes = require('./events');
const messageRoutes = require('./messages');

router.use('/user', userRoutes);
router.use('/events', eventsRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
