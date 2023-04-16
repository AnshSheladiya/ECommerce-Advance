/**
 * File Name: authServices.js
 */
const bcrypt = require('bcrypt');
const  User  = require('../models/user');

exports.checkUserExists = async (email) => {
  const user = await User.findOne({ email } );
  return user;
};

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

exports.createUser = async (body) => {
  const user = await User.create(body);
  return user.toJSON();
};

 // This method checks if the given old password matches the user's stored password
 exports.checkPassword=async (storedPassword, oldPassword)=> {
  try {
    const isMatch = await bcrypt.compare(oldPassword, storedPassword);
    return isMatch;
  } catch (error) {
    throw new Error(error.message);
  }
}

// This method updates the user's password with the new password
exports.updatePassword= async (userId, newPassword)=> {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
}
