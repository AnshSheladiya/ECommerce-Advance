/**
 * File Name: server.js
 */

const http = require('http');
const app = require('./src/app');
const config = require('./src/api/config/config');
const dotenv = require('dotenv');
const logger = require('./src/api/utils/logger');
const ResponseHelper = require('./src/api/utils/responseHelper');
const MSG=require('./src/api/utils/MSG');

// Load environment variables
dotenv.config();

// Set  global variable
global.logger = logger;
global.ResponseHelper = ResponseHelper;
global.MSG = MSG;

const port = config.port;

const server = http.createServer(app);

server.listen(port, () => {
 logger.info(`Server listening on port ${port}`);
});
