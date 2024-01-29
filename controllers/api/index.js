const router = require('express').Router();
// Import API route files
const eventRoutes = require('./events');
const messageRoutes = require('./messages');
const userRoutes = require('./userRoutes');

// Configure the API endpoints to use specific routes
router.use('/events', eventRoutes);
router.use('/messages', messageRoutes);


router.use('/', userRoutes); 

module.exports = router;
