/**
 * File Name: auth.js
 */

const express = require('express');
const { helloWorldController } = require('../controllers/auth');

const router = express.Router();

router.get('/', helloWorldController);

module.exports = router;
