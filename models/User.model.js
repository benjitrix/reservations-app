const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// local user model
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  reservations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}]
})

// pre save function for new local user registration
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  } else {
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
      if (err) {
        return next(err)
      } else {
        this.password = passwordHash;
        next()
      }
    })
  }   
})

// compare db password with local user login password
UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    } else if (!isMatch) {
        return cb(null, isMatch)
    } else {
      return cb(null, this)
    }
  })
}

module.exports = mongoose.model('User', UserSchema);