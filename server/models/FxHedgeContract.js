const mongoose = require('mongoose');
const { HEDGE_CONTRACT_TYPES, SUPPORTED_CURRENCIES } = require('../config/treasuryConstants');

const FxHedgeContractSchema = new mongoose.Schema({
  contractNumber: {
    type: String,
    required: true,
    unique: true
  },
  contractType: {
    type: String,
    enum: Object.values(HEDGE_CONTRACT_TYPES),
    default: HEDGE_CONTRACT_TYPES.FORWARD
  },
  baseCurrency: {
    type: String,
    enum: SUPPORTED_CURRENCIES,
    required: true
  },
  quoteCurrency: {
    type: String,
    enum: SUPPORTED_CURRENCIES,
    required: true
  },
  notionalAmount: {
    type: Number,
    required: true
  },
  strikeRate: {
    type: Number,
    required: true
  },
  currentSpotRate: {
    type: Number,
    required: true
  },
  markToMarketUsd: {
    type: Number,
    default: 0
  },
  counterpartyBank: {
    type: String,
    required: true
  },
  valueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['OPEN', 'SETTLED', 'CANCELLED', 'EXPIRED'],
    default: 'OPEN'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

FxHedgeContractSchema.index({ status: 1, valueDate: 1 });

module.exports = mongoose.model('FxHedgeContract', FxHedgeContractSchema);
