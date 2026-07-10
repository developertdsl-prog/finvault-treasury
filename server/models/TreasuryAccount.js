const mongoose = require('mongoose');
const { SUPPORTED_CURRENCIES, ACCOUNT_TYPES } = require('../config/treasuryConstants');

const TreasuryAccountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  iban: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  bicSwift: {
    type: String,
    required: true,
    trim: true
  },
  entityName: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    maxlength: 2
  },
  currency: {
    type: String,
    enum: SUPPORTED_CURRENCIES,
    required: true
  },
  accountType: {
    type: String,
    enum: Object.values(ACCOUNT_TYPES),
    default: ACCOUNT_TYPES.OPERATING
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  ledgerBalance: {
    type: Number,
    required: true,
    default: 0
  },
  targetBalanceThreshold: {
    type: Number,
    default: 100000
  },
  bankName: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastReconciledAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

TreasuryAccountSchema.index({ currency: 1, accountType: 1 });
TreasuryAccountSchema.index({ entityName: 1 });

module.exports = mongoose.model('TreasuryAccount', TreasuryAccountSchema);
