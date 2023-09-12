module.exports = function handleErrors(asyncFunction) {
  return async function (req, res, next) {
    try {
      return await asyncFunction(req, res, next);
    } catch (error) {
      // Handle the error
      logger.error(error);
      
      if (next)
        // Move to the next error handler
        return next(error);

      throw new Error(error.message);
    }
  };
};
