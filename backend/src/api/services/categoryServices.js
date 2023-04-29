/**
 * File Name: categoryServices.js
 */
 const Category = require('../models/category');

/**
 * Get all categories
 */
exports.getAllCategories = (options = {}) => {
  const query = { ...options, is_deleted: false }; 
  return Category.find(query);
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
 

