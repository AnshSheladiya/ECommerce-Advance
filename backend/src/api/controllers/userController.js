 /**
  * File Name: userController.js
  */
 console.log("5")

  const userService = require('../services/userServices');
  console.log("6")

  const JoiValidationSchema = require('../utils/JoiValidationSchema');
  console.log("7")

  const ResponseHelper = require('../utils/ResponseHelper');

  // exports.createUserProfile = async (req, res, next) => {
  //   try {
  //     const { error } = JoiValidationSchema.profileSchema.validate(req.body);
  //     if (error) {
  //       return res.status(400).json(ResponseHelper.error(400, error.message));
  //     }

  //     const userId = req.user.id;
  //     const userProfileData = req.body;
  //     const userProfile = await userService.createUserProfile(userId, userProfileData);
  //     return res.status(200).json(ResponseHelper.success(200, userProfile));
  //   } catch (error) {
  //     logger.error(error);
  //     next(error);
  //   }
  // };
  console.log("8")

  exports.getUserProfile = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userProfile = await userService.getUserProfile(userId);
      return res.status(200).json(ResponseHelper.success(200,MSG.FOUND_SUCCESS, userProfile));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  console.log("9")

  exports.getUser = async (req, res, next) => {
    try {
      const userProfile = await userService.getUser();
      return res.status(200).json(ResponseHelper.success(200,MSG.FOUND_SUCCESS, userProfile));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  // exports.updateUserProfile = async (req, res, next) => {
  //   try {
  //     const { error } = JoiValidationSchema.profileSchema.validate(req.body);
  //     if (error) {
  //       return res.status(400).json(ResponseHelper.error(400, error.message));
  //     }

  //     const userId = req.user.id;
  //     const userProfileData = req.body;
  //     const userProfile = await userService.updateUserProfile(userId, userProfileData);
  //     return res.status(200).json(ResponseHelper.success(200, userProfile));
  //   } catch (error) {
  //     logger.error(error);
  //     next(error);
  //   }
  // };

// exports.getAddresses = async (req, res, next) => {
//   try {
//        // validate user input
//    const { error } = JoiValidationSchema.addAddressSchema.validate(req.body);
//    if (error) {
//      return res.status(400).json(ResponseHelper.error(400, error.message));
//    }

//     const userId = req.user._id;
//     const addresses = await userService.getAddresses(userId);
//     res.status(200).json(addresses);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.updateAddress = async (req, res, next) => {
//   try {
//            // validate user input
//    const { error } = JoiValidationSchema.updateAddressSchema.validate(req.body);
//    if (error) {
//      return res.status(400).json(ResponseHelper.error(400, error.message));
//    }

//     const userId = req.user._id;
//     const addressId = req.params.addressId;
//     const update = req.body;
//     const updatedAddress = await userService.updateAddress(userId, addressId, update);
//     res.status(200).json(updatedAddress);
//   } catch (err) {
//     logger.error(error);
//     next(err);
//   }
// };

// exports.addAddress = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const address = req.body;
//     const newAddress = await userService.addAddress(userId, address);
//     res.status(201).json(newAddress);
//   } catch (err) {
//     logger.error(error);
//     next(err);
//   }
// };

// exports.deleteAddress = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const addressId = req.params.addressId;
//     await userService.deleteAddress(userId, addressId);
//     res.status(204).end();
//   } catch (err) {
//     logger.error(error);
//     next(err);
//   }
// };
