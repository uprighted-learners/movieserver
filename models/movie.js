const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  
  },
  genre: {
    type: String,
    required: true,
    trim: true,

  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  length: {
    type: Number,
    required: true,
    min: 0,  // Length in minutes
  },
  releaseYear: {
    type: Number,
    required: true,
    min: 1888,  // First movie ever made
    max: new Date().getFullYear() + 5  // Allow for future releases
  }
}, {
  timestamps: true,  // Adds createdAt and updatedAt fields
  collection: 'movies'
});


// Export the model
module.exports = mongoose.model('Movie', movieSchema);