const FxHedgeContract = require('../models/FxHedgeContract');
const TreasuryAccount = require('../models/TreasuryAccount');
const FxHedgingEngine = require('../services/fxHedgingEngine');
const { BENCHMARK_FX_RATES } = require('../config/treasuryConstants');

exports.getFxExposure = async (req, res, next) => {
  try {
    const accounts = await TreasuryAccount.find({ isActive: true });
    const exposures = FxHedgingEngine.calculateExposure(accounts);
    const nonUsdExposure = exposures.filter(e => e.currency !== 'USD');
    const totalNonUsdAmount = nonUsdExposure.reduce((sum, e) => sum + e.usdEquivalent, 0);
    const estimatedVaR = FxHedgingEngine.calculateVaR(totalNonUsdAmount);

    res.json({
      success: true,
      data: {
        totalNonUsdExposureUsd: Math.round(totalNonUsdAmount),
        valueAtRisk95PercentUsd: estimatedVaR,
        currencyBreakdown: exposures
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.listHedgeContracts = async (req, res, next) => {
  try {
    const contracts = await FxHedgeContract.find().sort({ valueDate: 1 });
    res.json({ success: true, count: contracts.length, data: contracts });
  } catch (err) {
    next(err);
  }
};

exports.createHedgeContract = async (req, res, next) => {
  try {
    const { contractType, baseCurrency, quoteCurrency, notionalAmount, strikeRate, counterpartyBank, daysToMaturity } = req.body;
    const currentSpot = BENCHMARK_FX_RATES[baseCurrency] || 1.0;
    const contractNumber = `FX-FWD-${Date.now().toString().slice(-6)}`;
    
    const valueDate = new Date();
    valueDate.setDate(valueDate.getDate() + (daysToMaturity || 90));

    const contract = await FxHedgeContract.create({
      contractNumber,
      contractType: contractType || 'FORWARD',
      baseCurrency,
      quoteCurrency: quoteCurrency || 'USD',
      notionalAmount,
      strikeRate: strikeRate || currentSpot,
      currentSpotRate: currentSpot,
      markToMarketUsd: 0,
      counterpartyBank: counterpartyBank || 'JPMorgan Chase Treasury',
      valueDate
    });

    res.status(201).json({ success: true, data: contract });
  } catch (err) {
    next(err);
  }
};
