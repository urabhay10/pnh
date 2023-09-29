const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); // Import the Note model
const jwtMiddleware = require('../middleware/jwtMiddleware')
// Route to create a new note
router.post('/create', jwtMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id; // Assuming user data is stored in req.user after authentication

    // Create a new note
    const newNote = new Note({
      title,
      content,
      author,
    });

    // Save the note to the database
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: 'Note creation failed' });
  }
});

// Route to retrieve all notes
router.get('/all', jwtMiddleware, async (req, res) => {
  try {
    // Retrieve all notes
    const notes = await Note.find({ author: req.user._id }); // Fetch notes created by the authenticated user

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notes' });
  }
});

// Add more routes as needed, e.g., for updating, deleting, or retrieving individual notes

module.exports = router;
