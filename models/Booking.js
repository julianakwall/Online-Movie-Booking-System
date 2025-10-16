const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: String,
  movieId: String,
  showtime: String,
  seats: [String],
  totalPrice: Number
});

module.exports = mongoose.model('Booking', BookingSchema);
