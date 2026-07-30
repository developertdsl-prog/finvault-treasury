const FxHedgingEngine = require('../services/fxHedgingEngine');

describe('FxHedgingEngine Risk & Forward Pricing Test Suite', () => {
  test('Calculates aggregated net non-USD exposures accurately', () => {
    const mockAccounts = [
      { currency: 'USD', balance: 10000000 },
      { currency: 'EUR', balance: 5000000 },
      { currency: 'GBP', balance: 2000000 }
    ];

    const exposures = FxHedgingEngine.calculateExposure(mockAccounts);
    expect(exposures).toHaveLength(3);

    const eurExp = exposures.find(e => e.currency === 'EUR');
    expect(eurExp.grossAmount).toBe(5000000);
    expect(eurExp.usdEquivalent).toBe(5425000);
  });

  test('Computes 1-day 95% parametric Value-at-Risk (VaR)', () => {
    const usdExposure = 10000000;
    const var95 = FxHedgingEngine.calculateVaR(usdExposure, 0.01);
    expect(var95).toBe(164500);
  });

  test('Prices FX forward contracts accurately with interest rate parity', () => {
    const spot = 1.085;
    const baseRateBps = 400; // 4.00%
    const quoteRateBps = 525; // 5.25%
    const forward = FxHedgingEngine.calculateForwardRate(spot, baseRateBps, quoteRateBps, 90);
    expect(forward).toBeGreaterThan(spot);
  });
});
