const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  date: String,
  location: String,
  synopsis: String,
  cast: [String],
  runtime: String,
  rating: String,
  showtimes: [String],
});

module.exports = mongoose.model('Movie', MovieSchema);
