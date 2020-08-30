const express = require('express')
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport')
const JWT = require('jsonwebtoken')
const TwitterUser = require('../models/TwitterUser.model')
const GoogleUser = require('../models/GoogleUser.model')
const User = require('../models/User.model')
const Reservation = require('../models/Reservation.model')
const jwtKey = require('../config/keys')
const {OAuth2Client} = require('google-auth-library')
const googleClientID = require('../config/keys')
const client = new OAuth2Client(googleClientID.google.clientID)
const socketio = require("socket.io");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000"

// create JWT for setting cookies and user authentication
const signToken = (userID, username, role) => {
  return JWT.sign({
    iss: "chris",
    sub: userID,
    name: username,
    role: role
  }, jwtKey.jwtSecret, {expiresIn: "1h"});
}

// create sessions ID with socketio for use in twitter auth route
const addSocketIdToSession = (req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
}

// User REGISTER: Local
userRouter.post('/register', (req, res) => {
  const { username, password, role } = req.body
  User.findOne({username}, (err, user) => {
    if (err) {
      res.status(500).json({message: {msgBody: 'Error has occurred', msgError: true}})
    } else if (user) {
      res.status(400).json({message: {msgBody: 'Username already taken', msgError: true}})
    } else {
      const newUser = new User({username, password, role});
      User.find({role: 'admin'}, (err, users) => {
        if (users.length > 4) {
          res.status(400).json({message: {msgBody: 'You are not allowed to register as an admin', msgError: true}})
        } else {
          newUser.save(err => {
          if (err) {
            res.status(500).json({message: {msgBody: 'Error has occurred', msgError: true}})
          } else {
            res.status(201).json({message: {msgBody: 'Account successfully created', msgError: false}})
          }
        })
        }
      })
    }
  })
})

// User LOGIN / REGISTER - Twitter
userRouter.get('/auth/twitter', addSocketIdToSession, passport.authenticate('twitter'));
// User callback/redirect - Twitter
userRouter.get('/auth/twitter/callback', passport.authenticate('twitter', { session: false }), (req, res) => {
    const { twitterId, name, source } = req.user;
    if (name) {
      const newName = `${name}@twitter`;
      TwitterUser.findOne({ username: newName }, (err, user) => {
        if (err) {
          res.status(500).json({ message: {msgBody: 'Error has occurred', msgError: true} })
        } else {
          if (user) {
            const _id = user._id;
            const username = `${name}@twitter`;
            const role = "user";
            const token = signToken(_id, username, role);
            res.cookie('access_token', token, { httpOnly: true, sameSite: true});
            res.redirect(`${CLIENT_HOME_PAGE_URL}/reservations`);
          } else {
            const username = `${name}@twitter`;
            const role = "user";
            const newUser = new TwitterUser({username, role})
            newUser.save(err => {
              if (err) {
                res.status(500).json({ message: {msgBody: 'Error has occurred', msgError: true} })
              } else {
                res.status(201).json({ message: {msgBody: 'Account successfully created', msgError: false} })
              }
            })
          }
        }
      })
    }
  });

// User LOGIN / REGISTER - Google
userRouter.post('/google/login', (req, res) => {
  const { tokenId, role } = req.body;
  client.verifyIdToken({idToken: tokenId, audience: googleClientID.google.clientID}).then(response => {
    const { email_verified, name, email, sub } = response.payload;
    if (email_verified) {
      GoogleUser.findOne({ username: email }, (err, user) => {
        if (err) {
        res.status(500).json({ message: {msgBody: 'Error has occurred', msgError: true} })
        } else {
            if (user) { 
                const _id = user._id;
                const username = email;
                const token = signToken(_id, username, role);
                res.cookie('access_token', token, { httpOnly: true, sameSite: true });
                res.status(200).json({ isAuthenticated: true, user: {username, role}});
            } else {
                const username = email
                const newUser =  new GoogleUser({username, role})
                newUser.save(err => {
                  if (err) {
                    res.status(500).json({ message: {msgBody: 'Error has occurred', msgError: true} })
                  } else {
                    res.status(201).json({ message: {msgBody: 'Account successfully created', msgError: false} });                   
                  }
                })  
            }
        }
      })
    }
  })
});

// User LOGIN: Local
userRouter.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username, role } = req.user;
    const token = signToken(_id, username, role);
    res.cookie('access_token', token, {httpOnly: true, sameSite: true})
    res.status(200).json({isAuthenticated: true, user: {username, role}})
  }
});

// User LOGOUT
userRouter.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.clearCookie('access_token')
  res.json({user: {username: "", role: ""}, success: true})
});

// Reservation CREATE
userRouter.post('/reservation', passport.authenticate('jwt', {session: false}), (req, res) => {
  const reservation = new Reservation(req.body);
  reservation.save(err => {
    if (err) {
      res.status(500).json({message: {msgBody: 'Error has occurred', msgError: true}})
    } else {
      req.user.reservations.push(reservation)
      req.user.save(err => {
        if (err) {
          res.status(500).json({message: {msgBody: 'Error has occurred', msgError: true}})
        } else {
          res.status(201).json({message: {msgBody: 'Reservation is successful', msgError: false}})
        }
      } )
    } 
  })
});

// Reservations GET
userRouter.get('/reservations', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = req.user.username;
  if (user.includes('@gmail.com')) {
    GoogleUser.findById({_id: req.user._id}).populate('reservations').exec((err, document) => {
    if (err) {
      res.status(500).json({message: {msgBody: 'Error has occurred', msgError: true}})
    } else {
      res.status(201).json({reservations: document.reservations, authenticated: true, msgError: false})
    }
  })
  } else if (user.includes('@twitter')) {
    TwitterUser.findById({_id: req.user._id}).populate('reservations').exec((err, document) => {
      if (err) {
        res.status(500).json({message: {msgBody: 'Error has occurred', msgError: true}})
      } else {
        res.status(201).json({reservations: document.reservations, authenticated: true, msgError: false})
      }
    })
  } else {
    User.findById({_id: req.user._id}).populate('reservations').exec((err, document) => {
      if (err) {
        res.status(500).json({message: {msgBody: 'Error has occurred', msgError: true}})
      } else {
        res.status(201).json({reservations: document.reservations, authenticated: true, msgError: false})
      }
    })
  }
});

// ALL Reservations GET
userRouter.get('/reservations/all', (req, res) => {
  // const user = req.user.username;
    Reservation.find({}, (err, document) => {
      if (err) {
        res.status(500).json({message: {msgBody: 'Error has occurred', msgError: true}})
      } else {
        res.status(201).json({allreservations: document, authenticated: true, msgError: false})
      }
    })
});

// User: admin
userRouter.get('/admin', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (req.user.role === 'admin') {
    res.status(200).json({message: {msgBody: 'You are an admin', msgError: false}})
  } else {
    res.status(403).json({message: {msgBody: 'You do not have admin rights', msgError: true}})
  }
})

// Reservation DELETE: admin
userRouter.get('/delete/reservation/:_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const _id = req.params._id
  console.log(_id)
    Reservation.findByIdAndDelete(_id, (err, doc) => {
    if (err) {
      res.status(500).json({ message: {msgBody: 'Error has occurred', msgError: true} })
    } else {
      res.status(200).json({ reservation: doc.seat, authenticated: true, message: {msgBody: 'Successfully deleted reservation', msgError: false} })
    }
  })
});

// Reservation UPDATE: admin 
userRouter.put('/update/reservation/:_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const _id = req.params._id
  const update = req.body
  Reservation.findByIdAndUpdate(_id, update, (err, doc) => {
    if (err) {
      res.status(500).json({ message: {msgBody: 'Error has occurred', msgError: true} })
    } else {
      res.status(200).json({ reservation: doc.seat, authenticated: true, message: {msgBody: 'Successfully updated reservation', msgError: false} })
    }
  })
});

// User session AUTHENTICATE
userRouter.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { username, role } = req.user;
    console.log('authenticated: ', username)
  res.status(200).json({isAuthenticated: true, user: {username: username, role: role}})
});

module.exports = userRouter;