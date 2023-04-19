/**
 * File Name: authServices.js
 */
const bcrypt = require('bcrypt');
const  User  = require('../models/user');
const { v4: uuid } = require('uuid');
const mailer = require('../utils/mailer');

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

exports.generatePasswordResetToken= async (userId)=> {
  const user = await User.findOne({ _id:userId } );
  if (!user) {
    throw new Error('User not found');
  }

  const token = uuid();
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

  user.password_reset_token = token;
  user.password_reset_expiry = expiresAt;
  await user.save();

  return token;
}

exports.sendPasswordResetEmail= async (userId, email)=> {
  const token = await generatePasswordResetToken(userId);
  const resetUrl = `https://example.com/reset-password?token=${token}`;

  const message = {
    to: email,
    subject: 'Password reset request',
    text: `Click on the following link to reset your password: ${resetUrl}`,
  };

  await mailer.send(message);
}

exports.validatePasswordResetToken=async (resetToken)=> {
  const user = await User.findOne({
    where: {
      passwordResetToken: resetToken,
      passwordResetTokenExpiresAt: {
        [Op.gt]: new Date(),
      },
    },
  });

  return !!user;
}

exports.resetPassword=async (resetToken, newPassword) =>{
  const user = await User.findOne({
    where: {
      passwordResetToken: resetToken,
      passwordResetTokenExpiresAt: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error('Invalid password reset token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.passwordResetToken = null;
  user.passwordResetTokenExpiresAt = null;
  await user.save();
}


