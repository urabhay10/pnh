const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); // Import the Note model
const jwtMiddleware = require('../middleware/jwtMiddleware')
const User = require('../models/User')
// Route to create a new note
router.post('/create', jwtMiddleware, async (req, res) => {
  try {
    const { title, content, isPublic} = req.body;
    const author = req.user._id; // Assuming user data is stored in req.user after authentication

    // Create a new note
    const newNote = new Note({
      title,
      content,
      author,
      isPublic
    });

    // Save the note to the database
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Note creation failed' });
  }
});

router.post('/delete',jwtMiddleware,async (req,res)=>{
  try {
    const {noteid}=req.body;
    const response = await Note.findByIdAndDelete(noteid);
    res.status(201).json({message: 'Deleted successfully'});
  } catch (error) {
    res.status(500).json({message: "Note deletion failed"})
  }
})

router.post('/edit',jwtMiddleware,async (req,res)=>{
  try {
    const {noteid}=req.body;
    const {title, content, isPublic}= req.body;
    const response = await Note.findByIdAndUpdate(noteid,{title,content,isPublic});
    res.status(201).json({message: 'Updated successfully'});
  } catch (error) {
    res.status(500).json({message: "Note updation failed"})
  }
})

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

router.get('/private', jwtMiddleware, async (req, res) => {
  try {
    // Retrieve private notes
    const notes = await Note.find({ author: req.user._id,isPublic: false }); // Fetch notes created by the authenticated user

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notes' });
  }
});

router.get('/public/all', async (req, res) => {
  try {
    // Retrieve all notes
    const notes = await Note.find({ isPublic: true }).populate('author'); //all public notes
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notes' });
  }
});

module.exports = router;