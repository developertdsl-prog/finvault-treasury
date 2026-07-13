const mongoose = require('mongoose');
const { POOL_TYPES, SUPPORTED_CURRENCIES } = require('../config/treasuryConstants');

const LiquidityPoolSchema = new mongoose.Schema({
  poolName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  poolType: {
    type: String,
    enum: Object.values(POOL_TYPES),
    default: POOL_TYPES.ZERO_BALANCE_SWEEP
  },
  baseCurrency: {
    type: String,
    enum: SUPPORTED_CURRENCIES,
    default: 'USD'
  },
  headerAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreasuryAccount',
    required: true
  },
  participantAccounts: [{
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TreasuryAccount',
      required: true
    },
    targetFloor: {
      type: Number,
      default: 0
    },
    sweepPriority: {
      type: Number,
      default: 1
    }
  }],
  autoSweepEnabled: {
    type: Boolean,
    default: true
  },
  sweepSchedule: {
    type: String,
    default: 'DAILY_1700_EST'
  },
  totalPooledBalanceUsd: {
    type: Number,
    default: 0
  },
  lastSweepRunAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LiquidityPool', LiquidityPoolSchema);
