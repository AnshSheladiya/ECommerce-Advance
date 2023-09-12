/**
 * File Name: brandController.js
 */
const brandService = require('../services/brandServices');
const {historyData,handleErrors,JoiValidationSchema} = require('../utils/dependencyContainer');

exports.getAllBrands = handleErrors(async (req, res, next) => {
  const brands = await brandService.getAllBrands();
  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, brands));
});

exports.getBrand = handleErrors(async (req, res, next) => {
  const brandId = req.params.brandId;
  const brand = await brandService.getBrand(brandId);

  if (!brand) {
    return res.status(400).json(ResponseHelper.error(400, MSG.BRAND_NOT_FOUND));
  }

  return res.status(200).json(ResponseHelper.success(200, MSG.FOUND_SUCCESS, brand));
});

exports.createBrand = handleErrors(async (req, res, next) => {
  // const { error } = JoiValidationSchema.createBrandSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).json(ResponseHelper.error(400, error.message));
  // }

  // Add history data for the brand creation
  const brandData = historyData.create(req.user._id, req.body);

  const brand = await brandService.createBrand(brandData);
  return res.status(200).json(ResponseHelper.success(200, MSG.BRAND_CREATED_SUCCESSFULLY, brand));
});

exports.updateBrand = handleErrors(async (req, res, next) => {
  const brandId = req.params.brandId;
  const brandData = req.body;

  // Add history data for the brand update
  const updatedBrandData = historyData.update(req.user._id, req.body);

  const brand = await brandService.updateBrand(brandId, updatedBrandData);

  if (!brand) {
    return res.status(400).json(ResponseHelper.error(400, MSG.BRAND_NOT_FOUND));
  }

  return res.status(200).json(ResponseHelper.success(200, MSG.BRAND_UPDATED_SUCCESSFULLY, brand));
});

exports.removeBrand = handleErrors(async (req, res, next) => {
  const brandId = req.params.brandId;

  let brand = await brandService.getBrand(brandId);
  if (!brand) {
    return res.status(400).json(ResponseHelper.error(400, MSG.BRAND_NOT_FOUND));
  }

  // Add history data for the brand removal
  const brandData = historyData.remove(req.user._id, brand._doc);

  await brandService.updateBrand(brandId, brandData);

  return res.status(200).json(ResponseHelper.success(200, MSG.BRAND_DELETED_SUCCESSFULLY));
});
