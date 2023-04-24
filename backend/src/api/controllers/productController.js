// productController.js
const productService = require('../services/productServices');
const JoiValidationSchema = require('../utils/JoiValidationSchema');
const ResponseHelper = require('../utils/ResponseHelper');
const historyData = require('../utils/historydataUtils');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, products));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProduct(productId);

    if (!product) {
      return res.status(400).json(ResponseHelper.error(400, MSG.PRODUCT_NOT_FOUND));
    }

    return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, product));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { error } = JoiValidationSchema.createProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json(ResponseHelper.error(400, error.message));
    }

    // Add history data for the product creation
    const productData = historyData.create(req.user._id, req.body);

    const product = await productService.createProduct(productData, req.files);
    return res.status(200).json(ResponseHelper.success(200, MSG.PRODUCT_CREATED_SUCCESSFULLY, product));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    // const { error } = JoiValidationSchema.updateProductSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json(ResponseHelper.error(400, error.message));
    // }

    // Add history data for the product updation
    const productData = historyData.update(req.user._id, req.body);

    const product = await productService.updateProduct(productId, productData);

    if (!product) {
      return res.status(400).json(ResponseHelper.error(400, MSG.PRODUCT_NOT_FOUND));
    }

    return res.status(200).json(ResponseHelper.success(200, MSG.PRODUCT_UPDATED_SUCCESSFULLY, product));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.removeProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    let product = await productService.getProduct(productId);
    if (!product) {
      return res.status(400).json(ResponseHelper.error(400, MSG.PRODUCT_NOT_FOUND));
    }

    // Add history data for the product updation
    const productData = historyData.remove(req.user._id,product._doc);

    await productService.removeProduct(productId, productData);
    return res.status(200).json(ResponseHelper.success(200, MSG.PRODUCT_DELETED_SUCCESSFULLY));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};


