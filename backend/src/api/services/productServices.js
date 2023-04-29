/**
 * File Name: productService.js
 */
const Product = require('../models/product');
const aggregationHelper=require('../helpers/aggregateHelpers/aggregationHelper');
const { cloudinary } = require('../utils/cloudinary');

exports.getAllProducts = async (userData,pipeline) => {
  try {
    const products = await aggregationHelper.aggregate('products', pipeline);
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getProductById = async (productId) => {
  try {
const product = await Product.findById(productId);  
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateProduct = async (productId, productData) => {
  try {
    const product = await Product.findByIdAndUpdate(productId, { $set: productData }, { new: true });
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.removeProduct = async (productId) => {
  try {
    const product = await Product.findByIdAndRemove(productId);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.uploadProductImages = async (productId, imageFiles,userData,angleNames) => {
  try {
    const product = await Product.findById(productId);
    const {id}=userData;

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      imageFiles.map(async (file, index) => {
        const angle = angleNames[index] || ''; 
        const result = await cloudinary.uploader.upload(file.path);
        return {
          url: result.secure_url,
          angle,
          isPrimary: (angle==='primary')?true:false,
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
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateProductImage = async (productId, imageId, file,userData) => {
  try {
    const product = await this.getProductById(productId);
    const {id}=userData;

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
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createProductReview = async (productId, userData, rating, comment) => {
  try {
    const product = await Product.findById(productId);
    const {id}=userData;

    if (!product) {
      throw new Error('Product not found');
    }

    const newReview = {
      reviewer_Id: id,
      reviewer_rating: rating,
      comment: comment,
    };

    product.reviews.push(newReview);
    await product.save();

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};
