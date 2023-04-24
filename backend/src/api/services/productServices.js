/**
 * File Name: productService.js
 */
const Product = require('../models/product');
const { cloudinary } = require('../utils/cloudinary');

exports.getAllProducts = async () => {
  try {
    const products = await Product.find();
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

exports.createProduct = async (productData, imageFiles) => {
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
