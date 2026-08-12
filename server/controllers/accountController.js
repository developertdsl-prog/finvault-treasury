const TreasuryAccount = require('../models/TreasuryAccount');
const { BENCHMARK_FX_RATES } = require('../config/treasuryConstants');

exports.getAllAccounts = async (req, res, next) => {
  try {
    const accounts = await TreasuryAccount.find({ isActive: true }).sort({ entityName: 1 });
    const formatted = accounts.map(acc => {
      const rate = BENCHMARK_FX_RATES[acc.currency] || 1.0;
      return {
        ...acc.toObject(),
        balanceUsdEquivalent: Math.round(acc.balance * rate)
      };
    });

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (err) {
    next(err);
  }
};

exports.createAccount = async (req, res, next) => {
  try {
    const account = await TreasuryAccount.create(req.body);
    res.status(201).json({ success: true, data: account });
  } catch (err) {
    next(err);
  }
};

exports.getAccountById = async (req, res, next) => {
  try {
    const account = await TreasuryAccount.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ success: false, error: 'Treasury account not found' });
    }
    res.json({ success: true, data: account });
  } catch (err) {
    next(err);
  }
};
