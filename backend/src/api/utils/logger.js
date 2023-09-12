/**
 * File Name: logger.js
 */
const winston = require('winston');
const { format } = require('logform');
require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  filename: './backend//logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    format.errors({ stack: true }),
    format.colorize(),
    format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} [${level}]: ${message}${stack ? '\n' + stack : ''}`;
    })
  ),
  transports: [new winston.transports.Console(), transport],
  exceptionHandlers: [new winston.transports.File({ filename: './backend/logs/exceptions.log' })],
});

module.exports = logger;
