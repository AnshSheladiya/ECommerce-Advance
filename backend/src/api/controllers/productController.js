// productController.js
const productService = require('../services/productServices');
const JoiValidationSchema = require('../utils/JoiValidationSchema');
const ResponseHelper = require('../utils/ResponseHelper');
const historyData = require('../utils/historydataUtils');
const limitStage = require('../helpers/aggregateHelpers/limitStageHelper');
const matchStage = require('../helpers/aggregateHelpers/matchStageHelper');
const sortStage = require('../helpers/aggregateHelpers/sortStageHelper');

exports.getAllProducts = async (req, res, next) => {
  try {
    const {
      pageNumber,
      pageSize,
      search,
      sortBy,
      minPrice,
      maxPrice,
      category,
      availability,
      minRating,
      color,
      brand,
      discount,
    } = req.query;

    const pipeline = [];

    // Add match filter for product name search
    if (search) {
      pipeline.push(matchStage.createMatchRegexStage('product_name', search));
    }

    // Add sort filter
    if (sortBy) {
      pipeline.push(sortStage.createSortStage(sortBy));
    }

    // Add price range filter
    if (minPrice || maxPrice) {
      const priceRangeFilter = {};
      if (minPrice) {
        priceRangeFilter.$gte = minPrice;
      }
      if (maxPrice) {
        priceRangeFilter.$lte = maxPrice;
      }
      pipeline.push(matchStage.createMatchStage('price', priceRangeFilter));
    }

    // Add category filter
    if (category) {
      pipeline.push(matchStage.createMatchStage('category', category));
    }

    // Add availability filter
    if (availability) {
      pipeline.push(matchStage.createMatchStage('is_available', availability));
    }

    // Add rating filter
    if (minRating) {
      pipeline.push(matchStage.createMatchStage('rating', { $gte: minRating }));
    }

    // Add color filter
    if (color) {
      pipeline.push(matchStage.createMatchStage('color', color));
    }

    // Add brand filter
    if (brand) {
      pipeline.push(matchStage.createMatchStage('brand', brand));
    }

    // Add discount filter
    if (discount) {
      pipeline.push(matchStage.createMatchStage('discount', { $gte: discount }));
    }

    // Add pagination filter
    if (pageNumber && pageSize) {
      pipeline.push(limitStage.createPaginationStages(pageNumber, pageSize));
    }

    const products = await productService.getAllProducts(req.user, pipeline);

    return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, products));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);

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

    const product = await productService.createProduct(productData);
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
    let product = await productService.getProductById(productId);
    if (!product) {
      return res.status(400).json(ResponseHelper.error(400, MSG.PRODUCT_NOT_FOUND));
    }

    // Add history data for the product updation
    const productData = historyData.remove(req.user._id, product._doc);

    await productService.removeProduct(productId, productData);
    return res.status(200).json(ResponseHelper.success(200, MSG.PRODUCT_DELETED_SUCCESSFULLY));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.uploadProductImages = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const angleNames = req.body.angleNames || [];

    const product = await productService.uploadProductImages(productId, req.files,req.user, angleNames);

    return res.status(200).json(ResponseHelper.success(200, MSG.UPLOAD_SUCCESS));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateProductPhoto = async (req, res, next) => {
  try {
    const { productId, imageId } = req.params;

    // Update the product image using the service
    const product = await productService.updateProductImage(productId, imageId, req.file,req.user);

    res.status(200).json({
      success: true,
      message: 'Product image updated successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


// exports.createProductReview = async (req, res, next) => {
//   try {
//     const { productId } = req.params;
//     const { rating, comment } = req.body;

//     const product = await productService.createProductReview(productId,req.user,rating, comment);

//     return res.status(200).json(ResponseHelper.success(200, MSG.REVIEW_CREATED_SUCCESSFULLY, product));
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
