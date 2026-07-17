const mongoose = require('mongoose');

const ComplianceAuditSchema = new mongoose.Schema({
  auditId: {
    type: String,
    required: true,
    unique: true
  },
  action: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['SWEEP_EXECUTION', 'WIRE_APPROVAL', 'AML_SANCTION_SCREEN', 'RECONCILIATION_RUN', 'SECURITY_ALERT'],
    required: true
  },
  entityId: {
    type: String
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  performedBy: {
    type: String,
    default: 'SYSTEM_AUTOMATION'
  },
  digitalSignature: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

ComplianceAuditSchema.index({ category: 1, timestamp: -1 });

module.exports = mongoose.model('ComplianceAudit', ComplianceAuditSchema);
