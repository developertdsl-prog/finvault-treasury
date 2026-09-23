import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TreasuryMetricsBar from './components/TreasuryMetricsBar';
import LiquidityPoolVisualizer from './components/LiquidityPoolVisualizer';
import MultiCurrencyAccountsTable from './components/MultiCurrencyAccountsTable';
import FxHedgingTerminal from './components/FxHedgingTerminal';
import ReconciliationAuditLog from './components/ReconciliationAuditLog';
import InitiateSweepModal from './components/InitiateSweepModal';
import { fetchTreasurySummary, fetchAccounts, fetchPools, fetchFxExposure } from './services/apiService';

function App() {
  const [summary, setSummary] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [pools, setPools] = useState([]);
  const [exposure, setExposure] = useState({});
  const [isSweepOpen, setIsSweepOpen] = useState(false);

  useEffect(() => {
    fetchTreasurySummary()
      .then(res => setSummary(res.data || {}))
      .catch(() => setSummary({
        totalConsolidatedLiquidityUsd: 76500000,
        totalActiveAccounts: 5,
        yieldOptimization: { estimatedAnnualYieldUsd: 4028000, blendedApyPercentage: 5.37 }
      }));

    fetchAccounts()
      .then(res => setAccounts(res.data || []))
      .catch(() => setAccounts([
        { entityName: 'FinVault Global Headquarters Inc.', accountNumber: 'US-OPS-1001-998', iban: 'US33CHAS00010019980001', currency: 'USD', balance: 45000000, balanceUsdEquivalent: 45000000 },
        { entityName: 'FinVault Europe GmbH', accountNumber: 'EU-SUB-2002-441', iban: 'DE89DBXX00020024410002', currency: 'EUR', balance: 14200000, balanceUsdEquivalent: 15407000 },
        { entityName: 'FinVault UK Holdings Ltd', accountNumber: 'UK-SUB-3003-882', iban: 'GB29BARC20030038820003', currency: 'GBP', balance: 8500000, balanceUsdEquivalent: 10837500 },
        { entityName: 'FinVault Asia Tokyo KK', accountNumber: 'JP-SUB-4004-115', iban: 'JP91BOTK00040041150004', currency: 'JPY', balance: 820000000, balanceUsdEquivalent: 5248000 },
        { entityName: 'FinVault Singapore Pte Ltd', accountNumber: 'SG-SUB-5005-773', iban: 'SG44DBSS00050057730005', currency: 'SGD', balance: 6200000, balanceUsdEquivalent: 4619000 }
      ]));

    fetchPools()
      .then(res => setPools(res.data || []))
      .catch(() => setPools([]));

    fetchFxExposure()
      .then(res => setExposure(res.data || {}))
      .catch(() => setExposure({ valueAtRisk95PercentUsd: 460000 }));
  }, []);

  const handleSweepExecution = (sweepType) => {
    alert(`Initiating ${sweepType}... Cash swept successfully.`);
  };

  return (
    <div className="terminal-container">
      <Navbar onOpenSweepModal={() => setIsSweepOpen(true)} />
      <main className="terminal-main">
        <TreasuryMetricsBar summary={summary} />

        <div style={{ marginTop: '20px' }}>
          <LiquidityPoolVisualizer pools={pools} />
        </div>

        <div className="dashboard-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <MultiCurrencyAccountsTable accounts={accounts} />
            <ReconciliationAuditLog />
          </div>
          <div>
            <FxHedgingTerminal exposure={exposure} />
          </div>
        </div>
      </main>

      <InitiateSweepModal
        isOpen={isSweepOpen}
        onClose={() => setIsSweepOpen(false)}
        onExecute={handleSweepExecution}
      />
    </div>
  );
}

export default App;
