const router = require('express').Router();
// Import API route files
const eventRoutes = require('./events');
const messageRoutes = require('./messages');
const userRoutes = require('./userRoutes');

// Configure the API endpoints to use specific routes
router.use('/events', eventRoutes);
router.use('/messages', messageRoutes);

// Note: Removed the /users prefix to allow direct access to /register
// If you need other user routes to be prefixed with /users, you'll need to adjust this setup
router.use('/', userRoutes); // Changed from '/users' to '/'

module.exports = router;
