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


// use like this
// const express = require('express');
// const ResponseHelper = require('./responseHelper');
// const app = express();

// app.get('/example', (req, res) => {
//   try {
//     const data = { message: 'Hello, world!' };
//     return res.status(200).json(ResponseHelper.success(data, 'Success!'));
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json(ResponseHelper.error(['An error occurred']));
//   }
// });
