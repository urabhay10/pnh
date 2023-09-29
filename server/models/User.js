const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true
  }
  // Add other user fields as needed
});

// Add Passport.js plugin for simplifying user authentication
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);