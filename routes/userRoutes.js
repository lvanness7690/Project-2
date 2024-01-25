const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User");

// Route for the home page
router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/events'); // Redirect to events page if already logged in
    } else {
        res.render('home'); // Render home.handlebars if not logged in
    }
});

// Register new user
router.post('/register', async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 8);

        const userData = await User.create({
            email: req.body.email,
            password: hashedPassword,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.redirect('/events'); // Redirect to events after successful registration
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json(err);
    }
});

// ... login and logout routes ...

module.exports = router;
