/**
 * File Name: mongoose-connection.js
 */
const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../utils/logger');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // time before failing initial connection
  socketTimeoutMS: 45000, // time before timing out queries
  family: 4, // use IPv4, skip trying IPv6
};

let retries = 0;
const maxRetries = 5;

function connectWithRetry() {
  logger.info('Connecting to MongoDB...');
  mongoose.connect(config.database[process.env.NODE_ENV || 'development'].url, options)
    .then(() => {
      logger.info('MongoDB connected!');
      retries = 0;
    })
    .catch((err) => {
      logger.error(`Failed to connect to MongoDB: ${err}`);
      if (retries < maxRetries) {
        retries++;
        logger.info(`Retrying connection (${retries}/${maxRetries})...`);
        setTimeout(connectWithRetry, 5000);
      } else {
        logger.error(`Maximum connection retries (${maxRetries}) reached`);
      }
    });
}


// Connect to the database
connectWithRetry();

// Use Mongoose transactions for atomicity and consistency
// Wrap transactional operations in a session to enable transactions
async function performTransaction(operations) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await operations(session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
