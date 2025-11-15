const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index on email for faster queries
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);