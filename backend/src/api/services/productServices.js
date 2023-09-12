/**
 * File Name: productService.js
 */
const {Product,User,aggregationHelper,cloudinary,EnumData,handleErrors} = require('../utils/dependencyContainer');

exports.getAllProducts = handleErrors(async (userData, pipeline) => {
  const products = await aggregationHelper.aggregate('products', pipeline);
  return products;
});

exports.getProductById = handleErrors(async (productId) => {
  const product = await Product.findById(productId);
  return product;
});

exports.addProductDetails = (userId, data) => {
  const addProductDetails = {
    ...data,
    is_new_arrival: true,
  };
  
  return addProductDetails;
};
exports.createProduct = handleErrors(async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
});

exports.updateProduct = handleErrors(async (productId, productData) => {
  const product = await Product.findByIdAndUpdate(productId, { $set: productData }, { new: true });
  return product;
});

exports.removeProduct = handleErrors(async (productId) => {
  const product = await Product.findByIdAndRemove(productId);
  return product;
});

exports.uploadProductImages = handleErrors(async (productId, imageFiles, userData, angleNames) => {
  const product = await Product.findById(productId);
  const { id } = userData;

  // Upload images to Cloudinary
  const uploadedImages = await Promise.all(
    imageFiles.map(async (file, index) => {
      const angle = angleNames[index] || '';
      const result = await cloudinary.uploader.upload(file.path);
      return {
        url: result.secure_url,
        angle,
        isPrimary: angle === 'primary' ? true : false,
        uploadedAt: Date.now(),
        createdBy: id,
        fileSize: file.size,
        mimeType: file.mimetype,
        dimensions: {
          width: result.width,
          height: result.height,
        },
      };
    })
  );

  // Add uploaded images to the product's images array
  product.images.push(...uploadedImages);

  // Save the updated product
  await product.save();

  return product;
});

exports.updateProductImage = handleErrors(async (productId, imageId, file, userData) => {
  const product = await this.getProductById(productId);
  const { id } = userData;

  // Find the index of the image to be updated
  const imageIndex = product.images.findIndex((image) => image._id.toString() === imageId);

  if (imageIndex === -1) {
    throw new Error('Image not found');
  }

  // Upload the updated image to Cloudinary
  const updatedImage = await cloudinary.uploader.upload(file.path);

  // Remove the old image from Cloudinary
  const oldImage = product.images[imageIndex];
  const publicId = oldImage.url.split('/').pop().split('.')[0];
  await cloudinary.uploader.destroy(publicId);

  // Update the image URL in the product's images array
  product.images[imageIndex].url = updatedImage.secure_url;
  product.images[imageIndex].updatedAt = Date.now();
  product.images[imageIndex].updatedBy = id;

  // Save the updated product
  await product.save();

  return product;
});

exports.getProductReviews = handleErrors(async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error(MSG.PRODUCT_NOT_FOUND);
  }

  return product.reviews;
});

exports.createProductReview = handleErrors(async (productId, userData, body) => {
  const { product_reviews } = userData;
  const { rating, comment } = body;
  const reviewerId = userData._id;

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error(MSG.PRODUCT_NOT_FOUND);
  }

  // Check if the reviewer already has a review for the product
  const existingReviewIndex = product.reviews.findIndex((review) => {
    const reviewId = review.reviewer_id ? review.reviewer_id.toString() : null;
    return reviewId === reviewerId.toString();
  });

  if (existingReviewIndex !== -1) {
    // Replace the existing review
    product.reviews[existingReviewIndex].reviewer_rating = rating;
    product.reviews[existingReviewIndex].comment = comment;
  } else {
    // Add a new review
    const newReview = {
      reviewer_id: reviewerId,
      reviewer_rating: rating,
      comment: comment,
    };
    product.reviews.push(newReview);
  }

  await product.save();

  // Calculate the average rating
  const totalReviews = product.reviews.length;
  const sumRatings = product.reviews.reduce((total, review) => total + review.reviewer_rating, 0);
  product.rating = totalReviews > 0 ? sumRatings / totalReviews : 0;

  // Save the new review details in the userData field
  const newProductReview = {
    product_id: product._id,
    rating: rating,
    comment: comment,
    date: new Date(),
  };
  product_reviews.push(newProductReview);

  // Save the updated userData
  await userData.save();

  await product.save();

  return product.reviews;
});

exports.incrementProductLikes = handleErrors(async (productId, userId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error(MSG.PRODUCT_NOT_FOUND);
  }
  // Check if the user has already liked the product
  const userLiked = product.likes.some((like) => like.equals(userId));
  if (userLiked) {
    throw new Error(MSG.LIKE_ALREADY);
  }

  product.likes.push(userId);
  product.likes_count += 1;
  await product.save();

  return product;
});

// Function to check if a product is considered new or old
exports.checkIsNewArrival = handleErrors((product) => {
  // Calculate the age of the product
  const productAgeInDays = Math.floor((Date.now() - product.created_at) / (1000 * 60 * 60 * 24));

  // Check if the product is considered old
  const isProductOld = productAgeInDays > 30; // Define the threshold for considering a product as old (30 days in this example)

  // Update the product's is_new_arrival value
  product.is_new_arrival = !isProductOld; // Set is_new_arrival to false if the product is old, true otherwise

  return product;
});

exports.saveRecentSearch = handleErrors(async (userId, keyword) => {
  // Inside the search endpoint handler, after adding the keyword to the array
  const MAX_RECENT_SEARCHES = EnumData.maxRecentSearches;
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Add the keyword to the user's recent searches
  user.recently_searches.push(keyword);

  // Check the number of recent searches and remove the oldest one if the limit is exceeded
  if (user.recently_searches.length > MAX_RECENT_SEARCHES) {
    user.recently_searches.shift(); // Remove the oldest search
  }
  await user.save();
  return user;
});

exports.getRelatedProducts = handleErrors(async (product) => {
  const MAX_RELETED_PRODUCTS = EnumData.maxRelatedProducts;

  // Define the criteria for finding related products
  const criteria = {
    category_id: product.category_id,
    _id: { $ne: product._id },
  };

  // Execute the query to find related products
  const relatedProducts = await Product.find(criteria).limit(MAX_RELETED_PRODUCTS);
  return relatedProducts;
});

exports.getRecommendedProducts = handleErrors(async (userId) => {
  // Retrieve the user document with the specified ID
  const user = await User.findById(userId)
    .populate('recently_viewed_products', 'product_name') // Assuming you want to populate the product_name field
    .populate('recently_searches', 'product_name')
    .populate('favorite_products', 'product_name')
    .populate('wish_list', 'product_name');

  // Extract the recently viewed products, recently searched keywords, favorite products, and wishlist
  const recentlyViewedProducts = user.recently_viewed_products.map((product) => product.product_name);
  const recentlySearchedKeywords = user.recently_searches.map((keyword) => keyword.product_name);
  const favoriteProducts = user.favorite_products.map((product) => product.product_name);
  const wishlist = user.wish_list.map((product) => product.product_name);

  // Example logic: Combine all the lists and remove duplicates
  const recommendedProducts = [
    ...recentlyViewedProducts,
    ...recentlySearchedKeywords,
    ...favoriteProducts,
    ...wishlist,
  ].filter((product, index, self) => self.indexOf(product) === index);

  // You can perform additional logic or database queries to determine the final recommended products list

  return recommendedProducts;
});

exports.getPopularProducts = handleErrors(async (limit) => {
  const popularProducts = await Product.find()
    .sort({ views: -1 }) // Sort by views in descending order
    .limit(limit); // Limit the number of results

  return popularProducts;
});

exports.getFeaturedProducts = handleErrors(async () => {
  const featuredProducts = await Product.find({ is_featured: true });

  return featuredProducts;
});

exports.getTopRatedProducts = handleErrors(async (limit) => {
  const topRatedProducts = await Product.find().sort({ rating: -1 }).limit(limit);
  return topRatedProducts;
});

exports.increaseViewsCount = handleErrors(async (product, userData) => {
  const { _id } = userData;

  if (!product.viewers.includes(_id)) {
    product.viewers.push(_id);
    product.views_count += 1;
    await product.save();
  }
  return product
});

exports.AddRecentlyViewedProducts = handleErrors(async (product, userData) => {
  const { _id } = userData;

  if (!product.viewers.includes(_id)) {
    product.viewers.push(_id);
    product.views_count += 1;
    await product.save();
  }
  return product
});

exports.uploadProductVideo = handleErrors(async (productId, videoFile, userData) => {
  const product = await Product.findById(productId);
  const { id } = userData;

  // Upload video to Cloudinary
  const result = await cloudinary.uploader.upload(videoFile.path, {
    resource_type: 'video',
    format: 'mp4', // Modify this based on your desired video format
  });

  // Create the video object
  const uploadedVideo = {
    url: result.secure_url,
    uploadedAt: Date.now(),
    createdBy: id,
    fileSize: videoFile.size,
    mimeType: videoFile.mimetype,
    duration: result.duration,
  };

  // Add the uploaded video to the product's videos array
  product.videos.push(uploadedVideo);

  // Save the updated product
  await product.save();

  return product;
});
