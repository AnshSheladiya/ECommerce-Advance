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
 const config = require('./api/config/config');
const sanitizeReqBody=require('./api/middlewares/sanitizeReqBody');
const path = require("path");

 const app = express();

 //public
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

 // set up session
 app.use(
   session({
     secret: 'your secret key',
     resave: false,
     saveUninitialized: false,
     cookie: {
       maxAge: 24 * 60 * 60 * 1000 // set cookie max age to 1 day
     },
     store: MongoStore.create({
       mongoUrl: config.database[process.env.NODE_ENV || 'development'].url
     })
   })
 );
 // Connect Database
 require('./api/db/mongoose-connection.js');

 // Middleware
 app.use(cors());
 app.use(helmet());
 app.use(bodyParser.json());
 app.use(sanitizeReqBody)
 // Initialize Passport middleware
 app.use(passport.initialize());
 app.use(passport.session());

 // Routes
 const authRoutes = require('./api/routes/authRoutes');
 app.use('/api/auth', authRoutes);
//  const userRoutes = require('./api/routes/userRoutes');
//  app.use('/api/user', userRoutes);
//  const productRoutes = require('./api/routes/productRoutes');
//  app.use('/api/products', productRoutes);

 // custom error handling middleware
 app.use(errorHandler);

if (config.node_env === "production") {
  app.use(express.static(path.join(__dirname,"..","..", "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("<h1>Hello From Node Server via nodemon</h1>");
  });
}


 module.exports = app;


