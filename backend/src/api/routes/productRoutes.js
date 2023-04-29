/**
 * File Name: productRoutes.js
 */
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const { parser } = require('../utils/cloudinary');

router.get('/', authMiddleware, productController.getAllProducts);
router.get('/:productId', authMiddleware, productController.getProduct);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:productId', authMiddleware, productController.updateProduct);
router.delete('/:productId', authMiddleware, productController.removeProduct);
router.post('/:productId/upload-images', authMiddleware,parser.array('images', 5), productController.uploadProductImages);
router.post('/:productId/update-image/:imageId', authMiddleware,parser.single('image', 1), productController.updateProductPhoto);

// Additional APIs
// router.get('/:productId/reviews', authMiddleware, productController.getProductReviews);
// router.post('/:productId/reviews', authMiddleware, productController.createProductReview);
// router.get('/:productId/related-products', authMiddleware, productController.getRelatedProducts);
// GET /products/:productId/similar-products
// GET /products/recommended
// GET /products/popular
// GET /products/featured
// GET /products/top-rated
// GET /products/recently-viewed

module.exports = router;

