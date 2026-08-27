const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const logger = require('./utils/logger');
const authApiKey = require('./middleware/authApiKey');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// REST API Route Imports
const accountRoutes = require('./routes/accountRoutes');
const poolRoutes = require('./routes/poolRoutes');
const fxRoutes = require('./routes/fxRoutes');
const reconciliationRoutes = require('./routes/reconciliationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));
}

app.use(rateLimiter);

// Health Check Endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'FinVault-Treasury', timestamp: new Date().toISOString() });
});

app.get('/api/v1/ping', (req, res) => {
  res.json({
    status: 'OPTIMAL',
    platform: 'FinVault-Treasury Corporate Management System',
    version: '1.0.0',
    isoCompliant: true,
    uptime: process.uptime()
  });
});

// Protected Treasury Subsystems
app.use('/api/v1/accounts', authApiKey, accountRoutes);
app.use('/api/v1/pools', authApiKey, poolRoutes);
app.use('/api/v1/fx', authApiKey, fxRoutes);
app.use('/api/v1/reconciliation', authApiKey, reconciliationRoutes);
app.use('/api/v1/analytics', authApiKey, analyticsRoutes);

app.use(errorHandler);

let server;
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    server = app.listen(PORT, () => {
      logger.info(`FinVault-Treasury Engine operational on port ${PORT} [Env: ${process.env.NODE_ENV || 'development'}]`);
    });
  });
}

module.exports = app;
