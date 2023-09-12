/**
 * File Name: authMiddleware.js
 */
const ResponseHelper = require('../utils/ResponseHelper');
const MSG = require('../utils/MSG');
const guestUserAuth = require('../utils/guestLoginAuth');

const authMiddleware = async (req, res, next) => {
  try {
    if (req.cookies.guestId) {
      const guestUser = await guestUserAuth(req.cookies.guestId);
      if (guestUser) {
        req.user = guestUser;
        return next();
      }
    }
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json(ResponseHelper.error(401, MSG.UNAUTHORIZED));
  } catch (error) {
    return next(error);
  }
};

module.exports = authMiddleware;
