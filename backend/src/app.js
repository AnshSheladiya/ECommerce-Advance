/**
 * File Name: app.js
 */

const express = require('express');
const authRoutes=require('./api/routes/auth')
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

module.exports = app;
