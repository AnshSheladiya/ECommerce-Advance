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
router.post(
  '/:productId/upload-images',
  authMiddleware,
  parser.array('images', 5),
  productController.uploadProductImages
);
router.post(
  '/:productId/update-image/:imageId',
  authMiddleware,
  parser.single('image', 1),
  productController.updateProductPhoto
);
router.get('/:productId/reviews', authMiddleware, productController.getProductReviews);
router.post('/:productId/reviews', authMiddleware, productController.createProductReview);
router.post('/:productId/likes', authMiddleware, productController.incrementProductLikes);
router.get('/:productId/related-products', authMiddleware, productController.getRelatedProducts);
router.get('/get/recommended', authMiddleware, productController.getRecommendedProducts);
router.get('/get/popular', authMiddleware, productController.getPopularProducts);
router.get('/get/featured', authMiddleware, productController.getFeaturedProducts);
router.get('/get/top-rated', authMiddleware, productController.getTopRatedProducts);
router.post(
  '/:productId/upload-video',
  authMiddleware,
  parser.single('video'),
  productController.uploadProductVideo
);
// GET /products/recently-viewed

module.exports = router;
