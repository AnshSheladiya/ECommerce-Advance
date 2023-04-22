/**
 * File Name: categoryServices.js
 */
 const Category = require('../models/category');

 /**
  * Get all categories
  */
 exports.getAllCategories = () => {
   return Category.find({});
 };
 
 /**
  * Get a category by ID
  */
 exports.getCategory = (categoryId) => {
   return Category.findById(categoryId);
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
 

