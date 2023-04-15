const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Connect Database
require('./api/db/mongoose-connection.js');

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./api/routes/auth');
app.use('/api/auth', authRoutes);

module.exports = app;
