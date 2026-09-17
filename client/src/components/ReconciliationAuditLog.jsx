import React from 'react';

const ReconciliationAuditLog = () => {
  const auditEntries = [
    { time: '17:00:00', type: 'ZBA_SWEEP', desc: 'Auto-sweep executed: Swept $15.4M equivalent to US-Master', status: 'SETTLED' },
    { time: '16:45:12', type: 'ISO_CAMT', desc: 'Parsed Deutsche Bank camt.053 XML statement: 142 items matched', status: 'MATCHED' },
    { time: '15:30:25', type: 'FX_FWD', desc: 'Executed 90-day EUR/USD hedge collar contract with BNP Paribas', status: 'CONFIRMED' },
    { time: '14:00:10', type: 'REPO_ALLOC', desc: 'Overnight Triparty Repo allocated: $20.0M @ 5.30% APY', status: 'ACTIVE' }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Live Treasury Audit Ledger</span>
        <span className="mono" style={{ fontSize: '0.7rem', color: '#10b981' }}>● ISO 20022 FEED</span>
      </div>

      <div style={{
        background: '#080b12',
        border: '1px solid #161f30',
        borderRadius: '6px',
        padding: '12px',
        fontSize: '0.75rem',
        maxHeight: '220px',
        overflowY: 'auto'
      }}>
        {auditEntries.map((log, idx) => (
          <div key={idx} style={{ marginBottom: '8px', lineHeight: '1.4' }}>
            <span className="mono" style={{ color: '#64748b' }}>[{log.time}]</span>{' '}
            <span className="mono" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>[{log.type}]</span>{' '}
            <span style={{ color: '#f1f5f9' }}>{log.desc}</span>{' '}
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>({log.status})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReconciliationAuditLog;
