const { BENCHMARK_FX_RATES } = require('../config/treasuryConstants');
const FxHedgeContract = require('../models/FxHedgeContract');

class FxHedgingEngine {
  /**
   * Calculates net foreign currency exposures consolidated in USD.
   */
  static calculateExposure(accounts) {
    const exposureMap = {};

    accounts.forEach(acc => {
      const curr = acc.currency;
      if (!exposureMap[curr]) {
        exposureMap[curr] = {
          currency: curr,
          grossAmount: 0,
          usdEquivalent: 0,
          accountsCount: 0
        };
      }
      exposureMap[curr].grossAmount += acc.balance;
      const rate = BENCHMARK_FX_RATES[curr] || 1.0;
      exposureMap[curr].usdEquivalent += acc.balance * rate;
      exposureMap[curr].accountsCount += 1;
    });

    return Object.values(exposureMap);
  }

  /**
   * Computes parametric Value-at-Risk (VaR at 95% confidence over 1-day horizon).
   */
  static calculateVaR(usdExposure, dailyVolatility = 0.0085) {
    // 95% confidence z-score is 1.645
    const zScore = 1.645;
    return Math.round(usdExposure * dailyVolatility * zScore);
  }

  /**
   * Prices a Forward Contract based on Interest Rate Parity:
   * F = S * (1 + r_quote * T) / (1 + r_base * T)
   */
  static calculateForwardRate(spotRate, baseRateBps, quoteRateBps, daysToMaturity) {
    const t = daysToMaturity / 360;
    const rBase = baseRateBps / 10000;
    const rQuote = quoteRateBps / 10000;
    const forwardRate = spotRate * ((1 + rQuote * t) / (1 + rBase * t));
    return parseFloat(forwardRate.toFixed(6));
  }

  /**
   * Calculates Mark-to-Market (MtM) unrealized gain/loss on an open contract.
   */
  static evaluateMarkToMarket(contract, currentSpotRate) {
    const rateDiff = currentSpotRate - contract.strikeRate;
    return Math.round(contract.notionalAmount * rateDiff);
  }
}

module.exports = FxHedgingEngine;
