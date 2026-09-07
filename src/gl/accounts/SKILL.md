---
name: accounts
description: "Use when maintaining the Chart of Accounts — creating or deactivating GL accounts, assigning accountType (asset/liability/equity/revenue/expense/gain-loss), tagging canonical roles (cash, ar, ap, revenue, IFRS-16 lease accounts) for the gl-account-resolver, tracking balances, and auditing account changes. The SAF-T §2 chart-of-accounts node."
atomPath: "gl/accounts"
coordinate: "gl/accounts · 5/round · 0c22cc44"
contentUuid: "de80f51f-aff2-5a18-a659-8b35fb7049de"
diamondUuid: "a662dfcc-bcf7-84f6-8f6c-6d639a36fb5e"
uuid: "0c22cc44-a93c-8a0e-9a47-cee9c2484fa3"
horo: 5
typography:
  partition: gl
  bondDegree: 44
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-3166-2"
  - "ISO-4217:2015 currency-codes account-currency"
  - "ISO-4217:2015 currency-codes account-currency`"
  - "ISO-9362"
  - "ISO/IEC-29119"
  - "OECD SAF-T §2 general-ledger-accounts"
  - "RFC-5545"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-210 balance-sheet"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "61f7ebca-1871-8895-b7cc-3ef3a278f228"
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
      stageUuid: "250aa8f3-0cfd-8a2a-8159-542a93119ac4"
    - stage: seal
      stageUuid: "b050fb19-2afc-8106-aefa-e3b6157620fe"
    - stage: uuid
      stageUuid: "bbb9c873-34f1-88b8-9c7d-ff4e7eb77d59"
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
