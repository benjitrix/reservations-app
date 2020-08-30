const mongoose = require('mongoose')

// Google user model
const UserSchema = new mongoose.Schema({
  username: String,
  role: {
    type: String,
    default: 'user',
    required: true
  },
  reservations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}]
});


module.exports = mongoose.model('GoogleUser', UserSchema);