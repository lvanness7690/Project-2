const router = require("express").Router();
const User = require("../../models/User");




// POST route for user registration
router.post('/register', async (req, res) => {

    try {
        const newUser = await User.create(req.body);
        res.redirect('/events'); // Redirect to the events page after successful registration
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
});
module.exports = router;
