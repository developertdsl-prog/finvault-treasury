const LiquidityPoolService = require('../services/liquidityPoolService');

describe('LiquidityPoolService Financial Sweeping Test Suite', () => {
  test('Correctly converts multi-currency balances to USD equivalent', () => {
    const eurAmount = 1000000;
    const usdEquivalent = LiquidityPoolService.convertToUsd(eurAmount, 'EUR');
    expect(usdEquivalent).toBe(1085000);
  });

  test('Preserves 1:1 conversion for native USD transactions', () => {
    const usdAmount = 500000;
    const converted = LiquidityPoolService.convertToUsd(usdAmount, 'USD');
    expect(converted).toBe(500000);
  });
});
