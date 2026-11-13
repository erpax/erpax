---
name: accounts
description: "Use when maintaining the Chart of Accounts — creating or deactivating GL accounts, assigning accountType (asset/liability/equity/revenue/expense/gain-loss), tagging canonical roles (cash, ar, ap, revenue, IFRS-16 lease accounts) for the gl-account-resolver, tracking balances, and auditing account changes. The SAF-T §2 chart-of-accounts node."
atomPath: "gl/accounts"
coordinate: "gl/accounts · 7/descent · 75d7cab7"
contentUuid: "89568230-1e57-5987-93bf-83f03efbc879"
diamondUuid: "ba480638-4903-844e-b545-e8fd5e46af28"
uuid: "75d7cab7-3c24-8748-85ad-836e20c5dded"
horo: 7
typography:
  partition: gl
  bondDegree: 41
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-13616-1"
  - "ISO-3166-2"
  - "ISO-4217:2015 currency-codes account-currency"
  - "ISO-4217:2015 currency-codes account-currency`"
  - "ISO-9362"
  - "ISO/IEC-29119"
  - "OECD SAF-T §2 general-ledger-accounts"
  - "RFC-5545"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-210 balance-sheet"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f37fdc68-d547-840a-a523-3d487b5cadf3"
  stages:
    - stage: path
      stageUuid: "7e314456-172a-833b-b65a-622e1b2c9fdd"
    - stage: trinity
      stageUuid: "4c05b5e1-1ccc-88be-aae1-8cdf9dbfbc63"
    - stage: boundary
      stageUuid: "aa24dd3d-1c4f-842e-98a9-661346894970"
    - stage: links
      stageUuid: "59b67049-d5e8-85d7-b83e-466ce45a4141"
    - stage: horo
      stageUuid: "93db9e14-8cf2-885a-a6f7-6c1e502170f1"
    - stage: seal
      stageUuid: "b050fb19-2afc-8106-aefa-e3b6157620fe"
    - stage: uuid
      stageUuid: "8c7255ab-02c5-8985-b609-baa442e31049"
version: 2
---
# gl-accounts

GL Accounts — Chart of Accounts.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes account-currency`

- ISO-4217:2015 currency-codes account-currency
- IFRS IAS-1 presentation-of-financial-statements
- US-GAAP ASC-210 balance-sheet
- OECD SAF-T §2 general-ledger-accounts
- ISO-19011:2018 audit-trail chart-of-accounts-change
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[access]] · [[proof]] · [[standard]].

**Law — [[law]]: the Chart of Accounts is the typed spine every [[transaction]] posts against — each account carries one accountType (asset/liability/equity/revenue/expense/gain-loss) and canonical role so resolution is deterministic, never free-text.**
