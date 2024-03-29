/**
 * File Name: userRoutes.js
 */
 const express = require('express');
 const router = express.Router();

 const userController = require('../controllers/userController');
 const authMiddleware = require('../middlewares/authMiddleware');

//  router.post('/profile', authMiddleware, userController.createUserProfile);
 router.get('/profile', authMiddleware, userController.getUserProfile);
 router.get('/users', userController.getUser);
//  router.put('/profile', authMiddleware, userController.updateUserProfile);

 module.exports = router;
