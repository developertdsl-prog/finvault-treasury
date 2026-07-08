const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/finvault_treasury';
  
  const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 20
  };

  try {
    const conn = await mongoose.connect(uri, options);
    logger.info(`Treasury Database Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    logger.error(`Database Connection Failure: ${error.message}`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  logger.warn('Treasury database connection disconnected. Reconnecting...');
});

mongoose.connection.on('error', (err) => {
  logger.error(`Database internal error: ${err.message}`);
});

module.exports = connectDB;
