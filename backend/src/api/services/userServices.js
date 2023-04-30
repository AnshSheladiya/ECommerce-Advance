 /**
  * File Name: userServices.js
  */
  const User = require('../models/user');

//   exports.createUserProfile = async (userId, userProfileData) => {
//     try {
//       const user = await User.findByIdAndUpdate(
//         userId,
//         { $set: { profile: userProfileData } },
//         { new: true }
//       );
//       return user.profile;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };

  exports.getUserProfile = async (userId) => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  exports.getUser = async () => {
    try {
      const user = await User.find();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

//   exports.updateUserProfile = async (userId, userProfileData) => {
//     try {
//       const user = await User.findByIdAndUpdate(
//         userId,
//         { $set: { profile: userProfileData } },
//         { new: true }
//       );
//       return user.profile;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };

// exports.getAddresses = async (userId) => {
//   const user = await User.findById(userId);
//   return {
//     shipping_addresses: user.shipping_address_book,
//     billing_addresses: user.billing_address_book,
//   };
// };

// exports.updateAddress = async (userId, addressId, update) => {
//   const user = await User.findById(userId);
//   const { shipping_address_book, billing_address_book } = user;

//   let updatedAddress = null;
//   let foundAddress = false;

//   shipping_address_book.forEach((address) => {
//     if (address._id.toString() === addressId) {
//       foundAddress = true;
//       Object.assign(address, update);
//       updatedAddress = address;
//     }
//   });

//   if (!foundAddress) {
//     billing_address_book.forEach((address) => {
//       if (address._id.toString() === addressId) {
//         foundAddress = true;
//         Object.assign(address, update);
//         updatedAddress = address;
//       }
//     });
//   }

//   if (!foundAddress) {
//     throw new Error('Address not found.');
//   }

//   await user.save();
//   return updatedAddress;
// };

// exports.addAddress = async (userId, address) => {
//   const user = await User.findById(userId);
//   if (address.label.toLowerCase() === 'shipping') {
//     user.shipping_address_book.push(address);
//   } else if (address.label.toLowerCase() === 'billing') {
//     user.billing_address_book.push(address);
//   } else {
//     throw new Error('Invalid address label.');
//   }
//   await user.save();
//   return address;
// };

// exports.deleteAddress = async (userId, addressId) => {
//   const user = await User.findById(userId);
//   const { shipping_address_book, billing_address_book } = user;

//   let addressIndex = shipping_address_book.findIndex((address) => address._id.toString() === addressId);
//   if (addressIndex !== -1) {
//     shipping_address_book.splice(addressIndex, 1);
//   } else {
//     addressIndex = billing_address_book.findIndex((address) => address._id.toString() === addressId);
//     if (addressIndex !== -1) {
//       billing_address_book.splice(addressIndex, 1);
// } else {
// throw new Error('Address not found.');
// }
// }
// await user.save();
// };
