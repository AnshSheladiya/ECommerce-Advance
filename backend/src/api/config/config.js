/**
 * File Name: config.js
 */
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
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
};
