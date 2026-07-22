const ComplianceAudit = require('../models/ComplianceAudit');
const crypto = require('crypto');

const auditTrail = (actionName, category) => {
  return async (req, res, next) => {
    const originalSend = res.json;
    res.json = function(data) {
      if (res.statusCode < 400 && process.env.NODE_ENV !== 'test') {
        const payloadString = JSON.stringify(req.body || {});
        const hash = crypto.createHash('sha256').update(payloadString).digest('hex');

        ComplianceAudit.create({
          auditId: `AUDIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          action: actionName,
          category: category || 'SWEEP_EXECUTION',
          entityId: req.params.id || 'N/A',
          details: { endpoint: req.originalUrl, method: req.method },
          performedBy: req.headers['x-treasury-user'] || 'AUTOMATED_AGENT',
          digitalSignature: `sig_${hash.slice(0, 16)}`
        }).catch(() => {});
      }
      originalSend.call(this, data);
    };
    next();
  };
};

module.exports = auditTrail;
