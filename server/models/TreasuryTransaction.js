const mongoose = require('mongoose');
const { SUPPORTED_CURRENCIES } = require('../config/treasuryConstants');

const TreasuryTransactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  sourceAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreasuryAccount',
    required: true
  },
  destinationAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreasuryAccount',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: SUPPORTED_CURRENCIES,
    required: true
  },
  amountUsdEquivalent: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['SWEEP', 'WIRE', 'INTERCOMPANY_LOAN', 'FX_SETTLEMENT', 'FEE'],
    default: 'SWEEP'
  },
  isoMessageReference: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['SETTLED', 'PENDING', 'REJECTED'],
    default: 'SETTLED'
  },
  settledAt: {
    type: Date,
    default: Date.now
  }
});

TreasuryTransactionSchema.index({ sourceAccountId: 1, settledAt: -1 });

module.exports = mongoose.model('TreasuryTransaction', TreasuryTransactionSchema);
