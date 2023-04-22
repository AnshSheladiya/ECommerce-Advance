/**
 * File Name: productRoutes.js
 */
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, productController.getAllProducts);
router.get('/:productId', authMiddleware, productController.getProduct);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:productId', authMiddleware, productController.updateProduct);
router.delete('/:productId', authMiddleware, productController.removeProduct);

module.exports = router;
