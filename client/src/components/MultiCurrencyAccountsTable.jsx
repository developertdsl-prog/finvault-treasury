import React from 'react';
import { formatUsd } from '../utils/formatters';

const MultiCurrencyAccountsTable = ({ accounts }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Subsidiary Operating Accounts</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{accounts.length} Entities</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '8px' }}>Entity</th>
              <th style={{ padding: '8px' }}>IBAN / BIC</th>
              <th style={{ padding: '8px' }}>Currency</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Native Balance</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>USD Equivalent</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(acc => (
              <tr key={acc._id || acc.accountNumber} style={{ borderBottom: '1px solid #141b29' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600, color: '#fff' }}>{acc.entityName}</td>
                <td className="mono" style={{ padding: '10px 8px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{acc.iban}</td>
                <td style={{ padding: '10px 8px' }}>
                  <span style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: '#1e293b',
                    color: 'var(--accent-cyan)',
                    fontWeight: 600
                  }}>
                    {acc.currency}
                  </span>
                </td>
                <td className="mono" style={{ padding: '10px 8px', textAlign: 'right', color: '#fff' }}>
                  {acc.currency} {acc.balance.toLocaleString()}
                </td>
                <td className="mono" style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  {formatUsd(acc.balanceUsdEquivalent || acc.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MultiCurrencyAccountsTable;
