// mysql.js
const mysql = require('mysql');
const config = require('../config/config');

const connection = mysql.createConnection({
  host: config.mysql_database.host,
  user: config.mysql_database.user,
  password: config.mysql_database.password
});
connection.connect((err) => {
  if (err) throw err;
  logger.info('MySQL connected!');
});

module.exports = connection;

// alter user 'root'@'localhost' identified with mysql_native_password by 'root123';