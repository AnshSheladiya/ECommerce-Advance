/**
 * File Name: categoryController.js
 */
const { createMatchStage } = require('../helpers/aggregateHelpers/matchStageHelper');
const {historyData,handleErrors,JoiValidationSchema} = require('../utils/dependencyContainer');
const categoryService = require('../services/categoryServices');

exports.getAllCategories = handleErrors(async (req, res, next) => {
  const pipeline = [];

  // things for getting proper results 
  pipeline.push(createMatchStage('is_deleted', false));

  const categories = await categoryService.getAllCategories(pipeline);
  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, categories));
});

exports.getCategory = handleErrors(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const category = await categoryService.getCategory(categoryId);

  if (!category) {
    return res.status(400).json(ResponseHelper.error(400, MSG.CATEGORY_NOT_FOUND));
  }

  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, category));
});

exports.createCategory = handleErrors(async (req, res, next) => {
  const { error } = JoiValidationSchema.createCategorySchema.validate(req.body);
  if (error) {
    return res.status(400).json(ResponseHelper.error(400, error.message));
  }
  // Add history data for the category creation
  const categoryData = historyData.create(req.user._id, req.body);

  const category = await categoryService.createCategory(categoryData);
  return res.status(200).json(ResponseHelper.success(200, MSG.CATEGORY_CREATED_SUCCESSFULLY, category));
});

exports.updateCategory = handleErrors(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const categoryData = req.body;

  // Add history data for the category update
  const updatedCategoryData = historyData.update(req.user._id, req.body);

  const category = await categoryService.updateCategory(categoryId, updatedCategoryData);

  if (!category) {
    return res.status(400).json(ResponseHelper.error(400, MSG.CATEGORY_NOT_FOUND));
  }

  return res.status(200).json(ResponseHelper.success(200, MSG.CATEGORY_UPDATED_SUCCESSFULLY, category));
});

exports.removeCategory = handleErrors(async (req, res, next) => {
  const categoryId = req.params.categoryId;

  let category = await categoryService.getCategory(categoryId);
  if (!category) {
    return res.status(400).json(ResponseHelper.error(400, MSG.CATEGORY_NOT_FOUND));
  }

  // Add history data for the category removal
  const categoryData = historyData.remove(req.user._id, category._doc);

  await categoryService.updateCategory(categoryId, categoryData);

  return res.status(200).json(ResponseHelper.success(200, MSG.CATEGORY_DELETED_SUCCESSFULLY));
});
