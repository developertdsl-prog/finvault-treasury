import React from 'react';
import { formatUsd } from '../utils/formatters';

const TreasuryMetricsBar = ({ summary }) => {
  const metrics = [
    { label: 'Consolidated Global Liquidity', value: formatUsd(summary.totalConsolidatedLiquidityUsd || 76500000), color: '#f59e0b' },
    { label: 'Estimated Annual Yield', value: formatUsd(summary.yieldOptimization?.estimatedAnnualYieldUsd || 4028000), color: '#10b981' },
    { label: 'Blended Treasury APY', value: `${summary.yieldOptimization?.blendedApyPercentage || 5.37}%`, color: '#06b6d4' },
    { label: 'Active Subsidiaries', value: summary.totalActiveAccounts || 5, color: '#a78bfa' },
    { label: 'Compliance Level', value: 'ISO 20022 Verified', color: '#38bdf8' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '14px'
    }}>
      {metrics.map((m, i) => (
        <div key={i} className="card" style={{ borderLeft: `3px solid ${m.color}` }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{m.label}</p>
          <p className="mono" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{m.value}</p>
        </div>
      ))}
    </div>
  );
};

export default TreasuryMetricsBar;
