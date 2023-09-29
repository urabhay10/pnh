const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For creating JSON Web Tokens
const User = require('../models/User'); // Import the User model
const jwtMiddleware = require('../middleware/jwtMiddleware');

// Route for user registration
router.post('/register', async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // You can generate and send a JWT token here for user authentication if needed
        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // You can generate and send a JWT token here for user authentication if needed
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed' });
    }
});

router.get('/profile', jwtMiddleware, (req, res) => {
    // The user information is available in req.user
    const userId = req.user._id;

    // Use the userId to retrieve user data from the database if needed
    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Return user data as needed
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Server error' });
        });
});

module.exports = router;
