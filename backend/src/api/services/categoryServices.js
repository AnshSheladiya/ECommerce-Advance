/**
 * File Name: categoryServices.js
 */
const {Category,aggregationHelper} = require('../utils/dependencyContainer');

/**
 * Get all categories
 */
exports.getAllCategories = async (pipeline) => {
  const Categories = await aggregationHelper.aggregate('categories', pipeline);
  return Categories;
};

/**
 * Get a category by ID
 */
exports.getCategory = (categoryId) => {
  const query = { _id: categoryId, is_deleted: false };
  return Category.findOne(query);
};

/**
 * Create a new category
 */
exports.createCategory = (categoryData) => {
  const category = new Category(categoryData);
  return category.save();
};

/**
 * Update a category by ID
 */
exports.updateCategory = (categoryId, categoryData) => {
  return Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
};

/**
 * Remove a category by ID
 */
exports.removeCategory = (categoryId) => {
  return Category.findByIdAndRemove(categoryId);
};
