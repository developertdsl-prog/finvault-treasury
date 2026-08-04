const ReconciliationEngine = require('../services/reconciliationEngine');
const { RECONCILIATION_STATUS } = require('../config/treasuryConstants');

describe('ReconciliationEngine 3-Way Statement Matching Test Suite', () => {
  test('Matches exact reference and amount statement line items', () => {
    const statementItems = [
      { reference: 'WIRE-9901', amount: 250000, currency: 'USD' }
    ];
    const ledgerItems = [
      { reference: 'WIRE-9901', amount: 250000, currency: 'USD' }
    ];

    const result = ReconciliationEngine.reconcileStatement(statementItems, ledgerItems);
    expect(result.matchRatePercentage).toBe(100);
    expect(result.matchedCount).toBe(1);
    expect(result.matched[0].status).toBe(RECONCILIATION_STATUS.MATCHED);
  });

  test('Flags unmatched statement entries for treasury investigation', () => {
    const statementItems = [
      { reference: 'UNKNOWN-FEE', amount: 1250, currency: 'USD' }
    ];
    const ledgerItems = [];

    const result = ReconciliationEngine.reconcileStatement(statementItems, ledgerItems);
    expect(result.matchRatePercentage).toBe(0);
    expect(result.unmatchedStatementCount).toBe(1);
    expect(result.unmatchedStatement[0].status).toBe(RECONCILIATION_STATUS.UNMATCHED);
  });
});
