const { RECONCILIATION_STATUS, DEFAULT_RECONCILIATION_TOLERANCE_USD } = require('../config/treasuryConstants');
const logger = require('../utils/logger');

class ReconciliationEngine {
  /**
   * 3-Way Reconciliation between Bank Statement line items and Internal Ledger entries.
   */
  static reconcileStatement(statementItems, ledgerItems, tolerance = DEFAULT_RECONCILIATION_TOLERANCE_USD) {
    const matched = [];
    const unmatchedStatement = [];
    const unmatchedLedger = [...ledgerItems];

    statementItems.forEach(stmtItem => {
      // Find candidate in ledger matching reference or close amount
      const candidateIdx = unmatchedLedger.findIndex(ledger => {
        const refMatch = stmtItem.reference && ledger.reference && stmtItem.reference.trim() === ledger.reference.trim();
        const amountDiff = Math.abs(stmtItem.amount - ledger.amount);
        const currMatch = stmtItem.currency === ledger.currency;
        return (refMatch || amountDiff <= tolerance) && currMatch;
      });

      if (candidateIdx >= 0) {
        const ledgerItem = unmatchedLedger.splice(candidateIdx, 1)[0];
        const diff = Math.abs(stmtItem.amount - ledgerItem.amount);
        matched.push({
          statementItem: stmtItem,
          ledgerItem,
          status: diff === 0 ? RECONCILIATION_STATUS.MATCHED : RECONCILIATION_STATUS.PARTIALLY_MATCHED,
          varianceUsd: diff
        });
      } else {
        unmatchedStatement.push({
          statementItem: stmtItem,
          status: RECONCILIATION_STATUS.UNMATCHED,
          reason: 'No matching transaction in internal general ledger'
        });
      }
    });

    const totalProcessed = statementItems.length;
    const matchRate = totalProcessed > 0 ? ((matched.length / totalProcessed) * 100).toFixed(1) : 100;

    return {
      matchRatePercentage: parseFloat(matchRate),
      totalStatementItems: totalProcessed,
      matchedCount: matched.length,
      unmatchedStatementCount: unmatchedStatement.length,
      unmatchedLedgerCount: unmatchedLedger.length,
      matched,
      unmatchedStatement,
      unmatchedLedger
    };
  }
}

module.exports = ReconciliationEngine;
