/**
 * File Name: config.js
 */
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  node_env: process.env.NODE_ENV,
  database: {
    development: {
      url: process.env.DEV_DATABASE_URL || 'mongodb://localhost:27017/myapp_dev',
    },
    test: {
      url: process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/myapp_test',
    },
    production: {
      url: process.env.PROD_DATABASE_URL || 'mongodb://user:password@mongo-db-instance-name:27017/myapp_prod',
    },
  },
  jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
  jwtEmailVerificationSecret: process.env.EMAIL_VERIFICATION_SECRET || 'myemailverificationsecretkey',
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  mail: {
    mail_user: process.env.MAIL_USER,
    mail_pass: process.env.MAIL_PASS
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  },
  url: {
    base_url: process.env.BASE_URL
  }
};
