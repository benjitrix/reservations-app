const mongoose = require('mongoose')

// reservation model
const ReservationSchema = new mongoose.Schema({
  seat: {
    type: String,
    required: true,
  },
  vacant: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // timestamps: {
  //   type: Date,
  //   createdAt: 'created_at'
  // }
});

module.exports = mongoose.model('Reservation', ReservationSchema);