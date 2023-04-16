/**
 * File Name: app.js
 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./api/middlewares/errorHandler');
const passport = require('passport');
require('./api/utils/passport')(passport);
const MongoStore = require('connect-mongo');
const config=require('./api/config/config');

const app = express();

// set up session
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // set cookie max age to 1 day
  },
  store: MongoStore.create({
    mongoUrl: config.database[process.env.NODE_ENV || 'development'].url
  })
}));

// Connect Database
require('./api/db/mongoose-connection.js');

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const authMiddleware = require('./api/middlewares/authMiddleware');

app.get('/', authMiddleware, (req, res) => {
  const { email } = req.user;
  res.json({ email });
});

// Routes
const authRoutes = require('./api/routes/authRoutes');
app.use('/api/auth', authRoutes);

// custom error handling middleware
app.use(errorHandler);

module.exports = app;
