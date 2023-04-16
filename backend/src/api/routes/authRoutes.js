/**
 * File Name: authRoutes.js
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Local login/signup routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);

// Google login route
router.get('/google', authController.googleLogin);

// Google login callback route
router.get('/google/callback', authController.googleCallback);

module.exports = router;
