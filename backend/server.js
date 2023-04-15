/**
 * File Name: server.js
 */

const http = require('http');
const app = require('./src/app');
const config = require('./src/api/config/config');
const dotenv = require('dotenv');
const logger = require('./src/api/utils/logger');

// Load environment variables
dotenv.config();

// Set the logger as a global variable
global.logger = logger;

const port = config.port;

const server = http.createServer(app);

server.listen(port, () => {
 logger.info(`Server listening on port ${port}`);
});
