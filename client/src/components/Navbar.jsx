import React from 'react';

const Navbar = ({ onOpenSweepModal }) => {
  return (
    <nav style={{
      background: 'var(--bg-panel)',
      borderBottom: '1px solid var(--border-color)',
      padding: '14px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '6px',
          background: 'linear-gradient(135deg, #f59e0b, #b45309)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          color: '#07090e',
          fontSize: '1.1rem',
          fontFamily: 'JetBrains Mono'
        }}>
          $
        </div>
        <div>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.3px' }}>
            FinVault<span style={{ color: 'var(--accent-gold)' }}>.Treasury</span>
          </h1>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Global Liquidity Pooling & ISO 20022 Engine</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '5px 12px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          color: '#10b981',
          fontFamily: 'JetBrains Mono'
        }}>
          ● SWIFT MT/MX: CONNECTED
        </div>
        <button className="btn-primary" onClick={onOpenSweepModal}>
          ⚡ Run Cash Sweep
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
