const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User");

// Route for the home page
router.get('/', (req, res) => {
    res.render('home'); // Renders the home.handlebars
});

// Register new user
router.post("/register", async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 8);

        // Create a new user with the hashed password
        await User.create({
            email: req.body.email,
            password: hashedPassword,
        });

        // Redirect to the events page after successful registration
        res.redirect('/events');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// Add additional routes as needed, for example:
// router.get('/events', (req, res) => {
//     // Logic to fetch events data (if needed)
//     res.render('events'); // Renders the events.handlebars
// });

// ... other routes ...

module.exports = router;
