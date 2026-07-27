const TreasuryAccount = require('../models/TreasuryAccount');
const CashConcentrationRun = require('../models/CashConcentrationRun');
const TreasuryTransaction = require('../models/TreasuryTransaction');
const { BENCHMARK_FX_RATES, POOL_TYPES } = require('../config/treasuryConstants');
const logger = require('../utils/logger');

class LiquidityPoolService {
  /**
   * Calculates USD value of an amount based on currency rate.
   */
  static convertToUsd(amount, currency) {
    const rate = BENCHMARK_FX_RATES[currency] || 1.0;
    return amount * rate;
  }

  /**
   * Executes a cash concentration sweep on a liquidity pool.
   */
  static async executeSweep(pool, triggeredBy = 'AUTOMATED_DISPATCH') {
    const startTime = Date.now();
    logger.info(`Starting cash concentration sweep for pool '${pool.poolName}' (Type: ${pool.poolType})`);

    const header = await TreasuryAccount.findById(pool.headerAccountId);
    if (!header) {
      throw new Error(`Master header account '${pool.headerAccountId}' not found`);
    }

    const transfers = [];
    let totalSweptUsd = 0;

    for (const participant of pool.participantAccounts) {
      const subAccount = await TreasuryAccount.findById(participant.accountId);
      if (!subAccount || !subAccount.isActive) continue;

      let sweepAmount = 0;
      if (pool.poolType === POOL_TYPES.ZERO_BALANCE_SWEEP) {
        // Sweep entire excess above zero
        sweepAmount = Math.max(0, subAccount.balance);
      } else if (pool.poolType === POOL_TYPES.TARGET_BALANCE) {
        // Sweep excess above target floor
        const floor = participant.targetFloor || subAccount.targetBalanceThreshold || 0;
        sweepAmount = Math.max(0, subAccount.balance - floor);
      }

      if (sweepAmount > 0) {
        const amountInUsd = this.convertToUsd(sweepAmount, subAccount.currency);
        
        // Execute atomic balance adjustment
        subAccount.balance -= sweepAmount;
        subAccount.ledgerBalance -= sweepAmount;
        await subAccount.save();

        // Credit header account (converted to header's currency)
        const headerCreditRate = BENCHMARK_FX_RATES[header.currency] || 1.0;
        const headerAmount = amountInUsd / headerCreditRate;
        header.balance += headerAmount;
        header.ledgerBalance += headerAmount;

        const ref = `SWEEP-${Date.now()}-${subAccount.accountNumber.slice(-4)}`;
        transfers.push({
          fromAccountId: subAccount._id,
          toAccountId: header._id,
          amount: sweepAmount,
          currency: subAccount.currency,
          amountInBaseUsd: amountInUsd,
          status: 'SETTLED',
          reference: ref
        });

        // Record audit transaction
        await TreasuryTransaction.create({
          transactionId: ref,
          sourceAccountId: subAccount._id,
          destinationAccountId: header._id,
          amount: sweepAmount,
          currency: subAccount.currency,
          amountUsdEquivalent: amountInUsd,
          type: 'SWEEP',
          status: 'SETTLED'
        });

        totalSweptUsd += amountInUsd;
      }
    }

    await header.save();

    // Create persistent run record
    const runRecord = await CashConcentrationRun.create({
      runId: `RUN-${Date.now()}`,
      poolId: pool._id,
      totalSweptUsd,
      transfersCount: transfers.length,
      transfers,
      status: 'COMPLETED',
      durationMs: Date.now() - startTime,
      triggeredBy
    });

    pool.totalPooledBalanceUsd = this.convertToUsd(header.balance, header.currency);
    pool.lastSweepRunAt = new Date();
    await pool.save();

    logger.info(`Completed sweep for '${pool.poolName}': Swept $${totalSweptUsd.toLocaleString()} USD across ${transfers.length} transfers.`);
    return runRecord;
  }
}

module.exports = LiquidityPoolService;
