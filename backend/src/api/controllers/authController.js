/**
 * File Name: authController.js
 */

const authService = require('../services/authServices');
const {User,handleErrors,JoiValidationSchema,passport} = require('../utils/dependencyContainer');

exports.signup = handleErrors(async (req, res, next) => {
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
  const email_verification_token = await authService.generateEmailVerificationToken({ email }, '1h');
  const user = {
    first_name,
    last_name,
    email,
    password,
    email_verification_token: email_verification_token,
  };
  // save user to database
  const savedUser = await authService.createUser(user);

  // send email verification email
  await authService.sendVerificationEmail(savedUser.email, savedUser.email_verification_token);

  return res.status(200).json(ResponseHelper.success(200, MSG.VERIFICATION_EMAIL_SENT_SUCCESS, user));
});

exports.verifyEmail = handleErrors(async (req, res, next) => {
  const { token } = req.query;

  // validate email verification token
  const isValid = await authService.validateEmailVerificationToken(token);
  if (!isValid) {
    return res.status(400).json(ResponseHelper.error(400, MSG.TOKEN_INVALID));
  }

  // update user email verification status
  await authService.verifyUserEmail(token);

  return res.status(200).json(ResponseHelper.success(200, MSG.VERIFIED_SUCCESS));
});

exports.login = handleErrors(async (req, res, next) => {
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
});

exports.logout = handleErrors(async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      logger.error(err);
      return next(err);
    }
    return res.status(200).json(ResponseHelper.success(200, MSG.LOGOUT_SUCCESS));
  });
});

exports.googleLogin = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

exports.googleCallback = handleErrors(async (req, res, next) => {
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
});

exports.createGuestUser = handleErrors(async (req, res, next) => {
  const { guestUUID } = req.body;

  // Check if there is a guest user associated with the UUID
  let guestUser = await User.findOne({ guestUUID });
  if (guestUser) {
    return res.status(400).json(ResponseHelper.error(400, 'Guest user already exists.'));
  }

  // If guest user doesn't exist, create a new one
  guestUser = await User.create({
    guestUUID,
    username: 'Guest',
  });

  return res.status(200).json(ResponseHelper.success(200, 'Guest user created successfully.', guestUser));
});

// Guest user login
exports.guestLogin = handleErrors(async (req, res, next) => {
  // Generate a unique guest username
  const guestUsername = `Guest-${Math.random().toString(36).substr(2, 6)}`;

  // Create a new guest user
  const newGuestUser = await User.create({
    username: guestUsername,
    guestUUID: uuid(),
  });

  // Set a cookie for the guest user
  res.cookie('guestId', newGuestUser.guestUUID, { maxAge: 3600000, httpOnly: true }); // Example: Set the cookie with a max age of 1 hour

  // Return success response
  return res.status(200).json(ResponseHelper.success(200, MSG.GUEST_LOGIN_SUCCESS, newGuestUser));
});

exports.getGuestUsers = handleErrors(async (req, res, next) => {
  const guestUsers = await User.find({ guestUUID: { $exists: true } });
  return res.status(200).json(ResponseHelper.success(200, MSG.GUESTS_FOUND_SUCCESS, guestUsers));
});

exports.getGuestUserById = handleErrors(async (req, res, next) => {
  const { id } = req.params;
  const guestUser = await User.findOne({ _id: id, guestUUID: { $exists: true } });

  if (!guestUser) {
    return res.status(404).json(ResponseHelper.error(404, MSG.GUESTS_NOT_FOUND));
  }

  return res.status(200).json(ResponseHelper.success(200, MSG.GUEST_FOUND_SUCCESS, guestUser));
});

exports.changePassword = handleErrors(async (req, res, next) => {
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
});

exports.forgotPassword = handleErrors(async (req, res, next) => {
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
});
exports.resetPassword = handleErrors(async (req, res, next) => {
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
});


