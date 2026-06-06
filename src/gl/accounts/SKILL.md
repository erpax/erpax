---
name: gl-accounts
description: Use when maintaining the Chart of Accounts — creating or deactivating GL accounts, assigning accountType (asset/liability/equity/revenue/expense/gain-loss), tagging canonical roles (cash, ar, ap, revenue, IFRS-16 lease accounts) for the gl-account-resolver, tracking balances, and auditing account changes. The SAF-T §2 chart-of-accounts node.
---

# gl-accounts

GL Accounts — Chart of Accounts.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes account-currency
- IFRS IAS-1 presentation-of-financial-statements
- US-GAAP ASC-210 balance-sheet
- OECD SAF-T §2 general-ledger-accounts
- ISO-19011:2018 audit-trail chart-of-accounts-change
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[access]] · [[proof]] · [[standard]].

**Law — [[law]]: the Chart of Accounts is the typed spine every [[transaction]] posts against — each account carries one accountType (asset/liability/equity/revenue/expense/gain-loss) and canonical role so resolution is deterministic, never free-text.**
