/**
 * File Name: dependencyContainer.js
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const mailer = require('../utils/mailer');
const jwt = require('jsonwebtoken');

const JoiValidationSchema = require('../utils/JoiValidationSchema');
const errorHandler = require('../middlewares/errorHandler');
const config = require('../config/config');
const sanitizeReqBody = require('../middlewares/sanitizeReqBody');
const easyLog = require('../utils/developmentHelpers');
const swaggerDocument = require('../../../docs/api-docs/swagger.json');
// const graphqlServer = require('../utils/graphql');
// const prisma = require('../utils/prisma');
const handleErrors = require('../utils/handleErrors');
const aggregationHelper = require('../helpers/aggregateHelpers/aggregationHelper');
const { cloudinary } = require('../utils/cloudinary');
const EnumData = require('../utils/enum.helper');
const authMiddleware = require('../middlewares/authMiddleware');
const historyData = require('../utils/historydataUtils');
const getPaginationObject = require('../utils/getPaginationObject');
// Models
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');

module.exports = {
  express,
  cors,
  path,
  helmet,
  bodyParser,
  cookieParser,
  axios,
  passport,
  errorHandler,
  config,
  sanitizeReqBody,
  easyLog,
  swaggerUi,
  swaggerDocument,
  // graphqlServer,
  // prisma,
  handleErrors,
  aggregationHelper,
  cloudinary,
  EnumData,
  bcrypt,
  uuid,
  mailer,
  jwt,
  authMiddleware,
  JoiValidationSchema,
  historyData,
  User,
  Product,
  Category,
  Brand,
};
