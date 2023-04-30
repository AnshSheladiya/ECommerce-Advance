/**
 * File Name: userRoutes.js
 */
 const express = require('express');
 const router = express.Router();
 console.log("2")

 const userController = require('../controllers/userController');
 const authMiddleware = require('../middlewares/authMiddleware');
 console.log("3")

//  router.post('/profile', authMiddleware, userController.createUserProfile);
 router.get('/profile', authMiddleware, userController.getUserProfile);
 router.get('/users', userController.getUser);
//  router.put('/profile', authMiddleware, userController.updateUserProfile);
console.log("4")

 module.exports = router;
