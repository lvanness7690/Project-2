// controllers/api/userRoutes.js

const router = require("express").Router();
<<<<<<< HEAD
const User = require("../../models/User");
||||||| f06c3c3
const User = require("../models/User");
=======
const { User } = require("../../models");
>>>>>>> main

<<<<<<< HEAD
router.get('/', (req, res) => {
    User.findAll().then((data) => {
        res.json(data);
    });
    //Create Session
});

router.post("/", async (req, res) => {
||||||| f06c3c3
router.get('/api/user', (req, res) => {
    User.findAll().then((data) => {
        res.json(data);
    });
});

router.post("/api/user", async (req, res) => {
=======
// POST route for user registration
router.post('/register', async (req, res) => {
>>>>>>> main
    try {
        const newUser = await User.create(req.body);
        res.redirect('/events'); // Redirect to the events page after successful registration
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
});
<<<<<<< HEAD
//Create Session 

||||||| f06c3c3

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/home', (req, res) => {
    res.render('home');
});

=======

>>>>>>> main
module.exports = router;
