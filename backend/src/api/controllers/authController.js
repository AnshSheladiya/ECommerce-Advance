/**
 * File Name: authController.js
 */

const authService = require('../services/authServices');
const passport = require('passport');
const JoiValidationSchema = require('../utils/JoiValidationSchema');

exports.signup = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // validate user input
    const { error } = JoiValidationSchema.registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json(ResponseHelper.error(400, error.message));
    }

    // check if user already exists
    const userExists = await authService.checkUserExists(email);
    if (userExists) {
      return res.status(400).json(ResponseHelper.error(400, MSG.EMAIL_ALREADY));
    }

    // create user object with email verification token
    const user = {
      first_name,
      last_name,
      email,
      password,
      email_verification_token: authService.generateEmailVerificationToken({ email }, '1h'),
    };

    // save user to database
    const savedUser = await authService.createUser(user);

    // send email verification email
    await authService.sendVerificationEmail(savedUser.email, savedUser.email_verification_token);

    return res.status(200).json(ResponseHelper.success(200, MSG.VERIFICATION_EMAIL_SENT_SUCCESS, user));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    // validate email verification token
    const isValid = await authService.validateEmailVerificationToken(token);
    if (!isValid) {
      return res.status(400).json(ResponseHelper.error(400, MSG.TOKEN_INVALID));
    }

    // update user email verification status
    await authService.verifyUserEmail(token);

    return res.status(200).json(ResponseHelper.success(200, MSG.VERIFIED_SUCCESS));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validate user input
    const { error } = JoiValidationSchema.loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json(ResponseHelper.error(400, error.message));
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        logger.error(err);
        return next(err);
      }

      if (!user) {
        return res.status(401).json(ResponseHelper.error(401, MSG.UNAUTHORIZED));
      }

      // check if user has verified their email
      if (!user.is_email_verified) {
        return res.status(401).json(ResponseHelper.error(401, MSG.EMAIL_NOT_VERIFIED));
      }

      req.logIn(user, (err) => {
        if (err) {
          logger.error(err);
          return next(err);
        }

        return res.status(200).json(ResponseHelper.success(200, MSG.LOGIN_SUCCESS, user));
      });
    })(req, res, next);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.logout(function (err) {
      if (err) {
        logger.error(err);
        return next(err);
      }
      return res.status(200).json(ResponseHelper.success(200, MSG.LOGOUT_SUCCESS));
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.googleLogin = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

exports.googleCallback = async (req, res, next) => {
  try {
    passport.authenticate('google', async (err, user, info) => {
      if (err) {
        logger.error(err);
        return next(err);
      }

      if (!user) {
        return res.status(401).json(ResponseHelper.error(401, MSG.UNAUTHORIZED));
      }

      req.logIn(user, async (err) => {
        if (err) {
          logger.error(err);
          return next(err);
        }

        return res.status(200).json(ResponseHelper.success(200, MSG.LOGIN_SUCCESS, user));
      });
    })(req, res, next);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { user } = req;

      // validate user input
      const { error } = JoiValidationSchema.changePasswordSchema.validate(req.body);
      if (error) {
        return res.status(400).json(ResponseHelper.error(400, error.message));
      }


    // check if old password is correct
    const isMatch = await authService.checkPassword(user.password, oldPassword);
    if (!isMatch) {
      return res.status(400).json(ResponseHelper.error(400, MSG.INVALID_PASSWORD));
    }

    // update user password
    await authService.updatePassword(user.id, newPassword);

    return res.status(200).json(ResponseHelper.success(200, MSG.PASSWORD_CHANGED_SUCCESSFULLY));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

      // validate user input
      const { error } = JoiValidationSchema.forgotPasswordSchema.validate(req.body);
      if (error) {
        return res.status(400).json(ResponseHelper.error(400, error.message));
      }

    // generate password reset token
    const resetToken = await authService.generatePasswordResetToken(email);

    // send password reset email to user
    await authService.sendPasswordResetEmail(email, resetToken);

    return res.status(200).json(ResponseHelper.success(200, MSG.PASSWORD_RESET_EMAIL_SENT_SUCCESS));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.query;

      // validate user input
      const { error } = JoiValidationSchema.resetPasswordSchema.validate(req.body);
      if (error) {
        return res.status(400).json(ResponseHelper.error(400, error.message));
      }

    // validate reset token
    const isValid = await authService.validatePasswordResetToken(token);
    if (!isValid) {
      return res.status(400).json(ResponseHelper.error(400, MSG.TOKEN_INVALID));
    }

    // update user password
    await authService.resetPassword(token, newPassword);

    return res.status(200).json(ResponseHelper.success(200, MSG.PASSWORD_RESET_SUCCESSFULLY));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
