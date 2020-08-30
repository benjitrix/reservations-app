const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI;

mongoose.Promise = global.Promise

// opens access to database before test
before(function(done) {
  mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  mongoose.connection.once('open', function() {
    console.log('MongoDB connected before test...')
    done();
  }).on('error', function(err) {
    console.log('MongoDB connection error:', err)
  })
});

// drops the TestUser collection before each test
beforeEach(function(done) {
  mongoose.connection.collections.testusers.drop(function() {
    done();
  })
});

// closes connection to database after tests are done
after(function() {
  mongoose.connection.close()
});
