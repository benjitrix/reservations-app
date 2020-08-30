const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy =  require('passport-jwt').Strategy;
const User = require('../models/User.model')
const GoogleUser = require('../models/GoogleUser.model')
const TwitterUser = require('../models/TwitterUser.model')
const jwtKey = require('./keys')
const TwitterConsumerID = require('./keys')


// Extract cookies from server
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token']
  }
  return token;
};

// authorisation strategy using jwt
passport.use('jwt', new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwtKey.jwtSecret
}, (payload, done) => {
  if ((payload.name).includes('@gmail.com')) {
    GoogleUser.findById({ _id: payload.sub }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  } else if ((payload.name).includes('@twitter')) {
    console.log((payload.name))
    TwitterUser.findById({ _id: payload.sub }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  } else {
    User.findById({_id: payload.sub}, (err, user) => {
      if (err) {
        return done(err, false)
      } else if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    });
  } 
}));

// authentication strategy using username and password
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username}, (err, user) => {
    // something went wrong with database
    if (err) {
      return done(err);
    } else if (!user) { // if no user exists
        return done(null, false)
    } else {
      user.comparePassword(password, done); // check if password is correct
    }
  })
}));

// authentication strategy using Twitter 
passport.use(new TwitterStrategy({
  consumerKey: TwitterConsumerID.twitter.consumerKey,
  consumerSecret: TwitterConsumerID.twitter.consumerSecret,
  callbackURL: TwitterConsumerID.twitter.callbackURL,
  }, 
    (_, __, profile, cb) => {
    const user = {
      name: profile.username,
      twitterId: profile.id,
      source: profile.provider
    }      
      // console.log(profile)
      return cb(null, user);
    }
));