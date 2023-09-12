/**
 * File Name: brandServices.js
 */
const {Brand} = require('../utils/dependencyContainer');

/**
 * Get all brands
 */
exports.getAllBrands = (options = {}) => {
  const query = { ...options, is_deleted: false };
  return Brand.find(query);
};

/**
 * Get a brand by ID
 */
exports.getBrand = (brandId) => {
  const query = { _id: brandId, is_deleted: false };
  return Brand.findOne(query);
};

/**
 * Create a new brand
 */
exports.createBrand = (brandData) => {
  const brand = new Brand(brandData);
  return brand.save();
};

/**
 * Update a brand by ID
 */
exports.updateBrand = (brandId, brandData) => {
  return Brand.findByIdAndUpdate(brandId, brandData, { new: true });
};

/**
 * Remove a brand by ID
 */
exports.removeBrand = (brandId) => {
  return Brand.findByIdAndRemove(brandId);
};
