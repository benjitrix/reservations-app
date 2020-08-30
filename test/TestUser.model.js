const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model for testuser
const TestUserSchema = new Schema({
  username: String
})

module.exports = mongoose.model('TestUser', TestUserSchema);