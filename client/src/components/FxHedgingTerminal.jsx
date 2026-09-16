import React from 'react';
import { formatUsd } from '../utils/formatters';

const FxHedgingTerminal = ({ exposure }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">FX Risk & Value-at-Risk (VaR)</span>
        <span className="mono" style={{ fontSize: '0.75rem', color: '#ef4444' }}>
          1-Day VaR (95%): {formatUsd(exposure?.valueAtRisk95PercentUsd || 460000)}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { pair: 'EUR/USD', exposure: '€14,200,000', spot: '1.0850', fwd30d: '1.0872', hedgeRatio: '85%' },
          { pair: 'GBP/USD', exposure: '£8,500,000', spot: '1.2750', fwd30d: '1.2784', hedgeRatio: '90%' },
          { pair: 'USD/JPY', exposure: '¥820,000,000', spot: '156.25', fwd30d: '155.80', hedgeRatio: '75%' }
        ].map((h, i) => (
          <div key={i} style={{
            background: '#0d131f',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '10px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{h.pair}</span>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Exposure: {h.exposure}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="mono" style={{ fontSize: '0.8rem', color: '#fff' }}>Spot: {h.spot}</span>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)' }}>Hedge: {h.hedgeRatio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FxHedgingTerminal;
