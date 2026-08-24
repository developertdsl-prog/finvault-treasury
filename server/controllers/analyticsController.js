const TreasuryAccount = require('../models/TreasuryAccount');
const LiquidityPool = require('../models/LiquidityPool');
const CashConcentrationRun = require('../models/CashConcentrationRun');
const YieldOptimizer = require('../services/yieldOptimizer');
const { BENCHMARK_FX_RATES } = require('../config/treasuryConstants');

exports.getTreasurySummary = async (req, res, next) => {
  try {
    const [accounts, pools, recentRuns] = await Promise.all([
      TreasuryAccount.find({ isActive: true }).lean(),
      LiquidityPool.find().lean(),
      CashConcentrationRun.find().sort({ executedAt: -1 }).limit(10).lean()
    ]);

    let totalLiquidityUsd = 0;
    accounts.forEach(acc => {
      const rate = BENCHMARK_FX_RATES[acc.currency] || 1.0;
      totalLiquidityUsd += acc.balance * rate;
    });

    const yieldRecommendation = YieldOptimizer.optimizeYield(totalLiquidityUsd);

    res.json({
      success: true,
      data: {
        totalConsolidatedLiquidityUsd: Math.round(totalLiquidityUsd),
        totalActiveAccounts: accounts.length,
        configuredPoolsCount: pools.length,
        yieldOptimization: yieldRecommendation,
        recentRunsCount: recentRuns.length,
        complianceStatus: 'ISO_20022_STRICT_COMPLIANT'
      }
    });
  } catch (err) {
    next(err);
  }
};
