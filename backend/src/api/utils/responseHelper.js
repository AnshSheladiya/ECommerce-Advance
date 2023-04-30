class ResponseHelper {
  static success(statusCode = 200, message = '',data,token ) {
    return {
      statusCode,
      message,
      success:true,
      data,
      token
    };
  }

  static error( statusCode = 500, message = 'An error occurred',errors) {
    return {
      statusCode,
      message,
      success: false,
      errors,
        };
  }
}

module.exports = ResponseHelper;
