/**
 * File Name: authMiddleware.js
 */
const MSG = require('../utils/MSG');

const authMiddleware = (req, res, next) => {
if (req.isAuthenticated()) {
return next();
}
return res.status(401).json(ResponseHelper.error(401, MSG.UNAUTHORIZED));
};

module.exports = authMiddleware;
