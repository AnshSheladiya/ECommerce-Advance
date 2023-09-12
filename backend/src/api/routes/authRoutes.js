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
router.post('/logout', authController.logout);

// Google login routes
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);

// Guest user routes
router.post('/guest/login', authController.guestLogin);
router.get('/guests', authMiddleware, authController.getGuestUsers);
router.get('/guests/:id', authMiddleware, authController.getGuestUserById);

// Change password route
router.put('/change-password', authMiddleware, authController.changePassword);

// Forgot/reset password routes
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password', authController.resetPassword);

// Email verify routes
router.get('/verify-email', authController.verifyEmail);

module.exports = router;
