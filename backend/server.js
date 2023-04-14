/**
 * File Name: server.js
 */

const http = require('http');
const app = require('./src/app');
const config = require('./src/api/utils/config');

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
