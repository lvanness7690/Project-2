const router = require("express").Router();
const bcrypt = require('bcrypt');
const { User } = require("../../models");

// POST route for user registration
router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.userId = newUser.id; // Save userId in session
        req.session.isLoggedIn = true;   // Mark the user as logged in
        res.redirect('/events');
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
});

// POST route for user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id; // Save userId in session
            req.session.isLoggedIn = true; // Mark the user as logged in
            res.redirect('/events');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
