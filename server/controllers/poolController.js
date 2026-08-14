const LiquidityPool = require('../models/LiquidityPool');
const LiquidityPoolService = require('../services/liquidityPoolService');

exports.getAllPools = async (req, res, next) => {
  try {
    const pools = await LiquidityPool.find().populate('headerAccountId participantAccounts.accountId');
    res.json({ success: true, count: pools.length, data: pools });
  } catch (err) {
    next(err);
  }
};

exports.createPool = async (req, res, next) => {
  try {
    const pool = await LiquidityPool.create(req.body);
    res.status(201).json({ success: true, data: pool });
  } catch (err) {
    next(err);
  }
};

exports.triggerSweep = async (req, res, next) => {
  try {
    const pool = await LiquidityPool.findById(req.params.id);
    if (!pool) {
      return res.status(404).json({ success: false, error: 'Liquidity pool not found' });
    }

    const runResult = await LiquidityPoolService.executeSweep(pool, req.body.triggeredBy || 'MANUAL_DASHBOARD_TRIGGER');
    res.status(200).json({ success: true, message: 'Sweep concentration completed', data: runResult });
  } catch (err) {
    next(err);
  }
};
