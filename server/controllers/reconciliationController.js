const ReconciliationEngine = require('../services/reconciliationEngine');
const TreasuryTransaction = require('../models/TreasuryTransaction');

exports.runReconciliation = async (req, res, next) => {
  try {
    const { statementItems } = req.body;
    if (!statementItems || !Array.isArray(statementItems)) {
      return res.status(400).json({ success: false, error: 'Statement items array required' });
    }

    const ledgerItems = await TreasuryTransaction.find().limit(200).lean();
    const result = ReconciliationEngine.reconcileStatement(statementItems, ledgerItems);

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
