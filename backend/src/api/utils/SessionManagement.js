//SessionManagement.js
const session = require('express-session');
const MongoStore = require('connect-mongo');

// This function initializes and sets up the session middleware
function setupSession(app, config) {
  app.use(
    session({
      secret: 'your secret key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // set cookie max age to 1 day
      },
      store: MongoStore.create({
        mongoUrl: config.database[process.env.NODE_ENV || 'development'].url,
      }),
    })
  );
}

module.exports = setupSession;




