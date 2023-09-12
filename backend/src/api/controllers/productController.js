// productController.js
const productService = require('../services/productServices');
const lookupStage = require('../helpers/aggregateHelpers/lookupStageHelper');
const limitStage = require('../helpers/aggregateHelpers/limitStageHelper');
const matchStage = require('../helpers/aggregateHelpers/matchStageHelper');
const sortStage = require('../helpers/aggregateHelpers/sortStageHelper');
const {historyData,handleErrors,JoiValidationSchema,Product} = require('../utils/dependencyContainer');
const getPaginationObject = require('../utils/getPaginationObject');

exports.getAllProducts = handleErrors(async (req, res, next) => {
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
    newArrival,
  } = req.query;

  const pipeline = [];
  const { _id } = req.user;
  const userId = _id;

  // Add match filter for product name search
  if (search) {
    // Call the productService function to save the recent search
    await productService.saveRecentSearch(userId, search);
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
      // Round up the minPrice value to the nearest decimal place
      const roundedMinPrice = Math.ceil(minPrice * 10) / 10;
      priceRangeFilter.$gte = roundedMinPrice;
    }
    if (maxPrice) {
      // Round down the maxPrice value to the nearest decimal place
      const roundedMaxPrice = Math.floor(maxPrice * 10) / 10;
      priceRangeFilter.$lte = roundedMaxPrice;
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

  // Add New Arrival filter
  if (newArrival) {
    pipeline.push(matchStage.createMatchStage('is_new_arrival', newArrival));
  }

  // Add Populate/Lookup for users and categories
  pipeline.push(
    lookupStage.createLookupAndProjectStage('categories', 'category_id', '_id', 'category_id', ['name', 'description'])
  );
  pipeline.push(
    lookupStage.createLookupAndProjectStage('users', 'reviews.reviewer_id', '_id', 'reviews', ['first_name', 'last_name', 'email'])
  );

  // Add pagination filter
  if (pageNumber && pageSize) {
    pipeline.push(...limitStage.createPaginationStages(pageNumber, pageSize));
  }

  const products = await productService.getAllProducts(req.user, pipeline);

  // add products paginate
  const  totalResults=await Product.countDocuments().exec();
  const paginationObject =await getPaginationObject(products, pageNumber, pageSize,totalResults);
  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, products,paginationObject));
});

exports.getProduct = handleErrors(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await productService.getProductById(productId);

  if (!product) {
    return res.status(400).json(ResponseHelper.error(400, MSG.PRODUCT_NOT_FOUND));
  }

  // increase Views Count Products
  await productService.increaseViewsCount(product,req.user);

  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, product));
});

exports.createProduct = handleErrors(async (req, res, next) => {
  const { _id } = req.user;
  const userId = _id;

  const { error } = JoiValidationSchema.createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json(ResponseHelper.error(400, error.message));
  }

  // Add history data for the product creation
  let productData = await historyData.create(userId, req.body);

  // Add new Product Data
  productData = productService.addProductDetails(userId, productData);

  const product = await productService.createProduct(productData);
  return res.status(200).json(ResponseHelper.success(200, MSG.PRODUCT_CREATED_SUCCESSFULLY, product));
});

exports.updateProduct = handleErrors(async (req, res, next) => {
  const productId = req.params.productId;
  // const { error } = JoiValidationSchema.updateProductSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).json(ResponseHelper.error(400, error.message));
  // }

  // Add history data for the product updation
  let productData = await historyData.update(req.user._id, req.body);

  // Check and update the is_new_arrival value
  productData = await productService.checkIsNewArrival(productData);

  const product = await productService.updateProduct(productId, productData);
  if (!product) {
    return res.status(400).json(ResponseHelper.error(400, MSG.PRODUCT_NOT_FOUND));
  }

  return res.status(200).json(ResponseHelper.success(200, MSG.PRODUCT_UPDATED_SUCCESSFULLY, product));
});

exports.removeProduct = handleErrors(async (req, res, next) => {
  const productId = req.params.productId;
  let product = await productService.getProductById(productId);
  if (!product) {
    return res.status(400).json(ResponseHelper.error(400, MSG.PRODUCT_NOT_FOUND));
  }

  // Add history data for the product updation
  let productData = await historyData.remove(req.user._id, product._doc);

  await productService.removeProduct(productId, productData);
  return res.status(200).json(ResponseHelper.success(200, MSG.PRODUCT_DELETED_SUCCESSFULLY));
});

exports.uploadProductImages = handleErrors(async (req, res, next) => {
  const { productId } = req.params;
  const angleNames = req.body.angleNames || [];

  const product = await productService.uploadProductImages(productId, req.files, req.user, angleNames);

  return res.status(200).json(ResponseHelper.success(200, MSG.UPLOAD_SUCCESS));
});

exports.updateProductPhoto = handleErrors(async (req, res, next) => {
  const { productId, imageId } = req.params;

  // Update the product image using the service
  const product = await productService.updateProductImage(productId, imageId, req.file, req.user);

  return res.status(200).json({
    success: true,
    message: 'Product image updated successfully',
    product,
  });
});

exports.getProductReviews = handleErrors(async (req, res, next) => {
  const productId = req.params.productId;
  const reviews = await productService.getProductReviews(productId);

  if (!reviews) {
    return res.status(400).json(ResponseHelper.error(400, MSG.PRODUCT_NOT_FOUND));
  }

  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, reviews));
});

exports.createProductReview = handleErrors(async (req, res, next) => {
  const productId = req.params.productId;

  const review = await productService.createProductReview(productId, req.user, req.body);

  return res.status(201).json(ResponseHelper.success(201, MSG.REVIEW_CREATED, review));
});

exports.incrementProductLikes = handleErrors(async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.user.id;
  const updatedProduct = await productService.incrementProductLikes(productId, userId);
  if (!updatedProduct) {
    return res.status(400).json(ResponseHelper.error(400, MSG.PRODUCT_NOT_FOUND));
  }

  return res.status(200).json(ResponseHelper.success(200, MSG.LIKE_SUCCESS));
});

exports.getRelatedProducts = handleErrors(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await productService.getProductById(productId);

  if (!product) {
    return res.status(400).json(ResponseHelper.error(400, MSG.PRODUCT_NOT_FOUND));
  }

  // Get related products based on a specific criteria (e.g., same category)
  const relatedProducts = await productService.getRelatedProducts(product);

  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, relatedProducts));
});

exports.getRecommendedProducts = handleErrors(async (req, res, next) => {
  const userId = req.user._id; // Assuming you have the user ID in the request object
  // Call the productService function to get the recommended products
  const recommendedProducts = await productService.getRecommendedProducts(userId);

  return res
    .status(200)
    .json(ResponseHelper.success(200, 'Recommended products retrieved successfully', recommendedProducts));
});

exports.getPopularProducts = handleErrors(async (req, res, next) => {
  const { limit } = req.query; // You can specify the limit for the number of popular products to retrieve

  const popularProducts = await productService.getPopularProducts(limit);

  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, popularProducts));
});

exports.getFeaturedProducts = handleErrors(async (req, res, next) => {
  const featuredProducts = await productService.getFeaturedProducts();

  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, featuredProducts));
});

exports.getTopRatedProducts = handleErrors(async (req, res, next) => {
  const limit = req.query.limit || 10;
  const topRatedProducts = await productService.getTopRatedProducts(limit);
  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, topRatedProducts));
});


exports.uploadProductVideo = handleErrors(async (req, res, next) => {
  const { productId } = req.params;

  const product = await productService.uploadProductVideo(productId, req.file, req.user);

  return res.status(200).json(ResponseHelper.success(200, MSG.UPLOAD_SUCCESS));
});
