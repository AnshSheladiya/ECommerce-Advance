const categoryService = require('../services/categoryService');
const JoiValidationSchema = require('../utils/JoiValidationSchema');
const ResponseHelper = require('../utils/ResponseHelper');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, categories));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await categoryService.getCategory(categoryId);

    if (!category) {
      return res.status(400).json(ResponseHelper.error(400, MSG.CATEGORY_NOT_FOUND));
    }

    return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, category));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { error } = JoiValidationSchema.createCategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json(ResponseHelper.error(400, error.message));
    }

    const categoryData = req.body;
    const category = await categoryService.createCategory(categoryData);
    return res.status(200).json(ResponseHelper.success(200, MSG.CATEGORY_CREATED_SUCCESSFULLY, category));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const categoryData = req.body;
    const category = await categoryService.updateCategory(categoryId, categoryData);

    if (!category) {
      return res.status(400).json(ResponseHelper.error(400, MSG.CATEGORY_NOT_FOUND));
    }

    return res.status(200).json(ResponseHelper.success(200, MSG.CATEGORY_UPDATED_SUCCESSFULLY, category));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.removeCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await categoryService.removeCategory(categoryId);

    if (!category) {
      return res.status(400).json(ResponseHelper.error(400, MSG.CATEGORY_NOT_FOUND));
    }

    return res.status(200).json(ResponseHelper.success(200, MSG.CATEGORY_DELETED_SUCCESSFULLY));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};


