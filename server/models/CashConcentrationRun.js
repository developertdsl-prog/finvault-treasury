const mongoose = require('mongoose');

const SweepTransferSchema = new mongoose.Schema({
  fromAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'TreasuryAccount', required: true },
  toAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'TreasuryAccount', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  amountInBaseUsd: { type: Number, required: true },
  status: { type: String, enum: ['SETTLED', 'PENDING', 'FAILED'], default: 'SETTLED' },
  reference: { type: String, required: true }
}, { _id: false });

const CashConcentrationRunSchema = new mongoose.Schema({
  runId: {
    type: String,
    required: true,
    unique: true
  },
  poolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LiquidityPool',
    required: true
  },
  totalSweptUsd: {
    type: Number,
    required: true
  },
  transfersCount: {
    type: Number,
    default: 0
  },
  transfers: [SweepTransferSchema],
  status: {
    type: String,
    enum: ['COMPLETED', 'PARTIALLY_SETTLED', 'FAILED'],
    default: 'COMPLETED'
  },
  durationMs: {
    type: Number,
    default: 0
  },
  triggeredBy: {
    type: String,
    default: 'SCHEDULED_TRIGGER'
  },
  executedAt: {
    type: Date,
    default: Date.now
  }
});

CashConcentrationRunSchema.index({ poolId: 1, executedAt: -1 });

module.exports = mongoose.model('CashConcentrationRun', CashConcentrationRunSchema);
