const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Treasury Operational Fault [${req.method} ${req.url}]: ${err.message}`, { stack: err.stack });

  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Financial Engine Exception',
    errorCode: err.code || 'ERR_INTERNAL_TREASURY_EXCEPTION',
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
