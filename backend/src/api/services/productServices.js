/**
 * File Name: productService.js
 */
const Product = require('../models/product');
const aggregationHelper=require('../helpers/aggregateHelpers/aggregationHelper');

exports.getAllProducts = async (userData,pipeline) => {
  try {
    const products = await aggregationHelper.aggregate('products', pipeline);
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getProduct = async (productId) => {
  try {
const product = await Product.findById(productId);  
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createProduct = async (productData) => {
  try {
    const uploadedImages = await Promise.all(imageFiles.map((image) => cloudinary.uploader.upload(image.path)));

    const product = new Product({
      ...productData,
      images: uploadedImages.map((image) => image.secure_url),
    });
    return await product.save();
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

exports.uploadProductImage = async (productId, image) => {
  try {
    // Find the product by its ID
    const product = await Product.findById(productId);

    // If the product is not found, throw an error
    if (!product) {
      throw new Error('Product not found');
    }

    // Add the image to the product's images array
    product.images.push(image);

    // Save the updated product document
    await product.save();

    return image;
  } catch (error) {
    throw new Error(error.message);
  }
};