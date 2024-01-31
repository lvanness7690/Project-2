const router = require("express").Router();
const bcrypt = require('bcrypt');
const { User } = require("../../models");

// POST route for user registration
router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = newUser.id; // Save userId in session
            req.session.isLoggedIn = true;   // Mark the user as logged in
            res.redirect('/events');
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
});



module.exports = router;
