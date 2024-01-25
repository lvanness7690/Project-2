const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// User Registration
router.post('/register', async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    
    // Create a new user record in your database
    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    
    // Redirect to the events page after successful registration
    res.redirect('/events');
  } catch (error) {
    // Handle errors (e.g., user already exists)
    res.status(500).send('Error registering new user');
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).send('User not found');
    }
    
    // Check the password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }
    
    // Redirect to the events page after successful login
    res.redirect('/events');
  } catch (error) {
    // Handle errors
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
