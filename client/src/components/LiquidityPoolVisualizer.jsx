import React from 'react';
import { formatUsd } from '../utils/formatters';

const LiquidityPoolVisualizer = ({ pools }) => {
  const samplePool = pools && pools.length > 0 ? pools[0] : {
    poolName: 'Global Multi-Currency ZBA Master Pool',
    poolType: 'ZERO_BALANCE_SWEEP',
    totalPooledBalanceUsd: 45000000,
    baseCurrency: 'USD'
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Corporate Liquidity Structure</span>
        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>
          {samplePool.poolType}
        </span>
      </div>

      <div style={{
        background: '#0a0e17',
        border: '1px solid var(--border-color)',
        borderRadius: '6px',
        padding: '16px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block',
          background: '#161f33',
          border: '1px solid var(--accent-gold)',
          borderRadius: '6px',
          padding: '12px 24px',
          marginBottom: '16px'
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Master Header Account (JPMorgan Chase)</p>
          <h3 className="mono" style={{ color: '#fff', fontSize: '1.2rem', marginTop: '4px' }}>
            {formatUsd(samplePool.totalPooledBalanceUsd)}
          </h3>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {[
            { entity: 'FinVault DE (EUR)', balance: '€14.2M ($15.4M)', sweep: 'ZBA Floor €200k' },
            { entity: 'FinVault UK (GBP)', balance: '£8.5M ($10.8M)', sweep: 'ZBA Floor £150k' },
            { entity: 'FinVault JP (JPY)', balance: '¥820M ($5.2M)', sweep: 'ZBA Floor ¥20M' },
            { entity: 'FinVault SG (SGD)', balance: 'S$6.2M ($4.6M)', sweep: 'ZBA Floor S$100k' }
          ].map((sub, idx) => (
            <div key={idx} style={{
              background: '#101624',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '10px 14px',
              minWidth: '180px'
            }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f8fafc' }}>{sub.entity}</p>
              <p className="mono" style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', margin: '4px 0' }}>{sub.balance}</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{sub.sweep}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiquidityPoolVisualizer;
