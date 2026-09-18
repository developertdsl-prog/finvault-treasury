import React, { useState } from 'react';

const InitiateSweepModal = ({ isOpen, onClose, onExecute }) => {
  const [sweepType, setSweepType] = useState('ZERO_BALANCE_SWEEP');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onExecute(sweepType);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="card" style={{ width: '440px', maxWidth: '90%' }}>
        <div className="card-header">
          <span className="card-title">Execute Cash Concentration Sweep</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Sweep Mechanism</label>
            <select
              value={sweepType}
              onChange={(e) => setSweepType(e.target.value)}
              style={{ width: '100%', padding: '8px', background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
            >
              <option value="ZERO_BALANCE_SWEEP">Two-Way Zero-Balance Account (ZBA)</option>
              <option value="TARGET_BALANCE">Target Balance Sweeping (Fixed Floor)</option>
            </select>
          </div>

          <div style={{ background: '#0a0e18', padding: '10px', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            This operation will sweep excess liquidity from all active global subsidiary accounts into the primary USD header account using real-time benchmark exchange rates.
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
            Authorize Global Sweep
          </button>
        </form>
      </div>
    </div>
  );
};

export default InitiateSweepModal;
