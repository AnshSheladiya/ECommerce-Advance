const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, categoryController.getAllCategories);
router.get('/:categoryId', authMiddleware, categoryController.getCategory);
router.post('/', authMiddleware, categoryController.createCategory);
router.put('/:categoryId', authMiddleware, categoryController.updateCategory);
router.delete('/:categoryId', authMiddleware, categoryController.removeCategory);

module.exports = router;
