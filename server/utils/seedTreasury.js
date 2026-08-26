const mongoose = require('mongoose');
const TreasuryAccount = require('../models/TreasuryAccount');
const LiquidityPool = require('../models/LiquidityPool');
const FxHedgeContract = require('../models/FxHedgeContract');
const logger = require('./logger');

const accountsToSeed = [
  {
    accountNumber: 'US-OPS-1001-998',
    iban: 'US33CHAS00010019980001',
    bicSwift: 'CHASUS33XXX',
    entityName: 'FinVault Global Headquarters Inc.',
    country: 'US',
    currency: 'USD',
    accountType: 'SWEEP_TARGET',
    balance: 45000000,
    ledgerBalance: 45000000,
    bankName: 'JPMorgan Chase Bank N.A.'
  },
  {
    accountNumber: 'EU-SUB-2002-441',
    iban: 'DE89DBXX00020024410002',
    bicSwift: 'DEUTDEDDXXX',
    entityName: 'FinVault Europe GmbH',
    country: 'DE',
    currency: 'EUR',
    accountType: 'OPERATING',
    balance: 14200000,
    ledgerBalance: 14200000,
    bankName: 'Deutsche Bank AG'
  },
  {
    accountNumber: 'UK-SUB-3003-882',
    iban: 'GB29BARC20030038820003',
    bicSwift: 'BARCGB22XXX',
    entityName: 'FinVault UK Holdings Ltd',
    country: 'GB',
    currency: 'GBP',
    accountType: 'OPERATING',
    balance: 8500000,
    ledgerBalance: 8500000,
    bankName: 'Barclays Bank UK'
  },
  {
    accountNumber: 'JP-SUB-4004-115',
    iban: 'JP91BOTK00040041150004',
    bicSwift: 'BOTKJPJTXXX',
    entityName: 'FinVault Asia Tokyo KK',
    country: 'JP',
    currency: 'JPY',
    accountType: 'OPERATING',
    balance: 820000000,
    ledgerBalance: 820000000,
    bankName: 'MUFG Bank Ltd'
  },
  {
    accountNumber: 'SG-SUB-5005-773',
    iban: 'SG44DBSS00050057730005',
    bicSwift: 'DBSSSGSGXXX',
    entityName: 'FinVault Singapore Pte Ltd',
    country: 'SG',
    currency: 'SGD',
    accountType: 'OPERATING',
    balance: 6200000,
    ledgerBalance: 6200000,
    bankName: 'DBS Bank Ltd'
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/finvault_treasury';
  await mongoose.connect(uri);
  logger.info('Connected to MongoDB for seeding Treasury Accounts...');

  const createdAccounts = [];
  for (const acc of accountsToSeed) {
    const doc = await TreasuryAccount.findOneAndUpdate({ accountNumber: acc.accountNumber }, acc, { upsert: true, new: true });
    createdAccounts.push(doc);
    logger.info(`Seeded Account: ${doc.accountNumber} (${doc.currency} ${doc.balance.toLocaleString()})`);
  }

  const masterHeader = createdAccounts[0];
  const participants = createdAccounts.slice(1).map(a => ({
    accountId: a._id,
    targetFloor: 200000,
    sweepPriority: 1
  }));

  const poolData = {
    poolName: 'Global-Multi-Currency-ZBA-Pool',
    poolType: 'ZERO_BALANCE_SWEEP',
    baseCurrency: 'USD',
    headerAccountId: masterHeader._id,
    participantAccounts: participants,
    autoSweepEnabled: true,
    totalPooledBalanceUsd: 45000000
  };

  await LiquidityPool.findOneAndUpdate({ poolName: poolData.poolName }, poolData, { upsert: true, new: true });
  logger.info(`Seeded Liquidity Pool: ${poolData.poolName}`);

  const sampleHedge = {
    contractNumber: 'FX-FWD-990142',
    contractType: 'FORWARD',
    baseCurrency: 'EUR',
    quoteCurrency: 'USD',
    notionalAmount: 5000000,
    strikeRate: 1.085,
    currentSpotRate: 1.086,
    markToMarketUsd: 5000,
    counterpartyBank: 'BNP Paribas Corporate Finance',
    valueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
  };

  await FxHedgeContract.findOneAndUpdate({ contractNumber: sampleHedge.contractNumber }, sampleHedge, { upsert: true, new: true });
  logger.info(`Seeded FX Forward Contract: ${sampleHedge.contractNumber}`);

  logger.info('FinVault Treasury seeding completed.');
  await mongoose.disconnect();
}

if (require.main === module) {
  seed().catch(err => {
    logger.error(`Seed error: ${err.message}`);
    process.exit(1);
  });
}

module.exports = seed;
