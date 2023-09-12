/**
 * File Name: userRoutes.js
 */
const {express,authMiddleware} = require('../utils/dependencyContainer');
const userController = require('../controllers/userController');

const router = express.Router();


//  router.post('/profile', authMiddleware, userController.createUserProfile);
router.get('/profile', authMiddleware, userController.getUserProfile);
router.get('/users', userController.getUser);
//  router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;
