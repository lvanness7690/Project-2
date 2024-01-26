// controllers/index.js
// Aggregates all controller routes

const router = require('express').Router();

// Import other route groups
const apiRoutes = require('./api');
const viewRoutes = require('./viewRoutes');

// Setup API routes under '/api' prefix
router.use('/api', apiRoutes);

// Setup view routes
router.use('/', viewRoutes);

module.exports = router;
