const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, brandController.getAllBrands);
router.get('/:brandId', authMiddleware, brandController.getBrand);
router.post('/', authMiddleware, brandController.createBrand);
router.put('/:brandId', authMiddleware, brandController.updateBrand);
router.delete('/:brandId', authMiddleware, brandController.removeBrand);

module.exports = router;
