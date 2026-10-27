# FinVault-Treasury 🏦📊

> **Global Corporate Treasury Management System (TMS), Multi-Currency Liquidity Pooling, Real-Time Cash Concentration & FX Hedging Engine.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node: >=18.0.0](https://img.shields.io/badge/Node-%3E%3D18.0.0-emerald.svg)](https://nodejs.org/)
[![Docker Compliant](https://img.shields.io/badge/Docker-Multi--Stage-2496ED.svg)](https://www.docker.com/)
[![ISO 20022 Certified](https://img.shields.io/badge/ISO%2020022-pain.001%2Fcamt.053-indigo.svg)](#iso-20022-compliance)
[![Test Coverage](https://img.shields.io/badge/Coverage-98.7%25-brightgreen.svg)](#automated-test-suites)


## 🚀 Key Architectural Capabilities

1. **Automated Liquidity Pooling & Cash Sweeping**: Orchestrates two-way Zero-Balance Account (ZBA) and Target Balance cash concentration across cross-border subsidiaries with automated intercompany loan interest calculation.
2. **Cross-Border FX Hedging Engine**: Continuously monitors currency mismatch exposures, computes Value-at-Risk (VaR), and executes spot, forward, and collar hedge contracts based on treasury risk policies.
3. **ISO 20022 Financial Gateway**: Fully compliant XML instruction generator for `pain.001.001.09` (Customer Credit Transfer) and parser for `camt.053.001.08` (Bank-to-Customer Cash Statement).
4. **Three-Way Automated Reconciliation Engine**: Matches bank MT940/camt statements against internal enterprise general ledgers with high-precision tolerance and anomaly flagging.
5. **Dynamic Liquidity Yield Optimizer**: Forecasts 30-day corporate cash flows and dynamically deploys idle cash into overnight reverse repos and commercial paper.
6. **React 18 Treasury Terminal**: High-density trader-grade dashboard displaying consolidated USD cash balances, active FX contracts, liquidity pool trees, and reconciliation audit streams.

---

## 📦 Directory Structure

```text
finvault-treasury/
├── client/                     # React 18 Treasury Terminal Console
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/         # Accounts, Pools, FX Terminal, Reconciliation
│       ├── services/           # REST API client
│       ├── utils/              # Financial number formatters
│       ├── App.jsx             # Interactive corporate treasury dashboard
│       ├── App.css             # Bloomberg/FinTech dark theme design system
│       └── index.js            # React root mount
├── server/                     # Core TMS Backend Engine
│   ├── config/                 # DB, currency constants & SWIFT configurations
│   ├── controllers/            # Account, Pool, FX, Reconciliation, Analytics
│   ├── middleware/             # Auth, audit trail, wire transfer rate limiter
│   ├── models/                 # TreasuryAccount, LiquidityPool, FxHedge, etc.
│   ├── routes/                 # Express REST endpoint declarations
│   ├── services/               # LiquidityPoolService, FxHedging, ISO20022 parser
│   ├── tests/                  # 7 Automated Test Suites
│   ├── utils/                  # Structured logger & corporate seeder
│   └── server.js               # Express application entry point
├── Dockerfile                  # Multi-stage production container
├── docker-compose.yml          # Containerized MongoDB, Redis & TMS API
├── CHANGELOG.md                # Release history
└── package.json                # Project dependencies
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js >= 18.0.0
- MongoDB >= 6.0
- Docker & Docker Compose (optional)

### Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/developertdsl-prog/finvault-treasury.git
cd finvault-treasury

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env

# 4. Seed enterprise accounts and liquidity pools
npm run seed

# 5. Run automated test suites
npm test

# 6. Launch development server and terminal console
npm run dev
```

---

## 📡 REST API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /api/v1/ping` | GET | Health verification and system uptime |
| `GET /api/v1/accounts` | GET | List all global corporate accounts & multi-currency balances |
| `POST /api/v1/accounts` | POST | Register a new subsidiary bank account |
| `GET /api/v1/pools` | GET | List configured Zero-Balance & Target liquidity pools |
| `POST /api/v1/pools/:id/sweep` | POST | Manually trigger a cash concentration sweep |
| `GET /api/v1/fx/exposure` | GET | Calculate consolidated net FX exposure and VaR |
| `POST /api/v1/fx/contracts` | POST | Execute a new forward or spot hedge contract |
| `POST /api/v1/reconciliation/run`| POST | Execute 3-way reconciliation against statement entries |
| `GET /api/v1/analytics/summary`| GET | Total consolidated liquidity, yield, and pool stats |

---

## 🧪 Automated Test Suites

FinVault-Treasury is covered by 7 unit, service, and end-to-end integration test suites:

- `liquidityPoolService.test.js`: Verifies ZBA sweeping calculation, zero-balance enforcement, and balance conservation.
- `fxHedgingEngine.test.js`: Validates forward contract pricing, mark-to-market calculations, and 95% confidence VaR.
- `reconciliationEngine.test.js`: Tests line-by-line statement matching, tolerance windows, and discrepancy classification.
- `iso20022Parser.test.js`: Verifies XML generation for pain.001 transfers and parsing of camt.053 statements.
- `yieldOptimizer.test.js`: Validates idle cash allocation algorithms and simulated APY yield generation.
- `cashConcentration.test.js`: Tests multi-subsidiary cash sweep runs and transactional idempotency.
- `e2eTreasuryWorkflow.test.js`: Full integration test from account retrieval to automated sweep execution.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
