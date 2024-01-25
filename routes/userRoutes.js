const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User");

// ... existing routes ...

// Register new user
router.post("/register", async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 8);

        // Create a new user with the hashed password
        const newUser = await User.create({
            email: req.body.email,
            password: hashedPassword,
        });

        // Redirect to the events page after successful registration
        res.redirect('/events'); // Make sure you have a route to render this page
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// ... remaining routes ...

module.exports = router;
