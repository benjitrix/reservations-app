const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const passport = require('passport')
const session = require("express-session");
const helmet = require("helmet");

// secure app by setting several HTTP headers
app.use(helmet());

// cookie, json parser
app.use(cookieParser())
app.use(express.json())

// initialize passport
app.use(passport.initialize());

// set up sessions for twitter user authentication
app.use(session({ 
  secret: 'KeyboardKittens', 
  resave: true, 
  saveUninitialized: true 
}))

// serialize, deserialize user
passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

// router middleware
const userRouter = require('./routes/User')
app.use('/user', userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// DB config
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false   })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

// start server
const PORT = process.env.PORT || 5000 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = app;