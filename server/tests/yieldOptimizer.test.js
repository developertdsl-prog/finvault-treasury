const YieldOptimizer = require('../services/yieldOptimizer');

describe('YieldOptimizer Liquidity Deployment Test Suite', () => {
  test('Allocates surplus liquidity across repos, commercial paper, and tbills', () => {
    const totalSurplus = 10000000;
    const operationalBuffer = 2000000;

    const opt = YieldOptimizer.optimizeYield(totalSurplus, operationalBuffer);
    expect(opt.deployableSurplus).toBe(8000000);
    expect(opt.estimatedAnnualYieldUsd).toBeGreaterThan(400000);
    expect(opt.allocation).toHaveLength(3);
  });

  test('Retains 100% of funds when surplus is below operational minimum', () => {
    const opt = YieldOptimizer.optimizeYield(1500000, 2000000);
    expect(opt.deployableSurplus).toBe(0);
    expect(opt.estimatedAnnualYieldUsd).toBe(0);
  });
});
