class YieldOptimizer {
  /**
   * Generates optimal cash deployment recommendations based on surplus liquidity.
   */
  static optimizeYield(totalSurplusUsd, targetOperationalBufferUsd = 2000000) {
    const deployableSurplus = Math.max(0, totalSurplusUsd - targetOperationalBufferUsd);

    if (deployableSurplus === 0) {
      return {
        operationalBufferRetained: totalSurplusUsd,
        deployableSurplus: 0,
        estimatedAnnualYieldUsd: 0,
        allocation: []
      };
    }

    // Allocation Buckets
    // 50% Overnight Reverse Repo (Fed RRP / Triparty Repo) @ 5.30%
    // 30% Tier-1 Commercial Paper @ 5.55%
    // 20% Short-Term US Treasury Bills (30D) @ 5.20%
    const repoAmount = Math.round(deployableSurplus * 0.50);
    const cpAmount = Math.round(deployableSurplus * 0.30);
    const tbillsAmount = deployableSurplus - repoAmount - cpAmount;

    const repoYield = repoAmount * 0.0530;
    const cpYield = cpAmount * 0.0555;
    const tbillsYield = tbillsAmount * 0.0520;
    const totalYield = repoYield + cpYield + tbillsYield;

    return {
      operationalBufferRetained: targetOperationalBufferUsd,
      deployableSurplus,
      estimatedAnnualYieldUsd: Math.round(totalYield),
      blendedApyPercentage: parseFloat(((totalYield / deployableSurplus) * 100).toFixed(2)),
      allocation: [
        { instrument: 'Overnight Triparty Repo', amountUsd: repoAmount, rate: '5.30%', liquidity: 'T+0' },
        { instrument: 'Tier-1 Commercial Paper', amountUsd: cpAmount, rate: '5.55%', liquidity: 'T+30' },
        { instrument: 'Short-Term Treasury Bills', amountUsd: tbillsAmount, rate: '5.20%', liquidity: 'T+1' }
      ]
    };
  }
}

module.exports = YieldOptimizer;
