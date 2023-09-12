/**
 * File Name: guestLoginAuth.js
 */
const User = require('../models/user');

const guestUserAuth = async (guestUUID) => {
  try {
    // Check if the guest user already exists in the database
    const guestUser = await User.findOne({ guestUUID: guestUUID });
    return guestUser;
  } catch (error) {
    throw error;
  }
};

module.exports = guestUserAuth;
