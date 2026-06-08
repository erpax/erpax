---
name: accounts
description: "Use when maintaining the Chart of Accounts — creating or deactivating GL accounts, assigning accountType (asset/liability/equity/revenue/expense/gain-loss), tagging canonical roles (cash, ar, ap, revenue, IFRS-16 lease accounts) for the gl-account-resolver, tracking balances, and auditing account changes. The SAF-T §2 chart-of-accounts node."
atomPath: gl/accounts
coordinate: gl/accounts · 1/base · 06dcf682
contentUuid: "2e7b180a-042b-54a8-8622-16d87d979a62"
diamondUuid: "4e39d9d6-a640-8909-b610-765e0117e921"
uuid: "06dcf682-ad63-84fb-aea3-13a4e360fea0"
horo: 1
bonds:
  in:
    - access
    - accounting
    - auth
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
  out:
    - access
    - accounting
    - auth
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
typography:
  partition: gl
  bondDegree: 0
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-13616-1"
  - "ISO-19011:2018 audit-trail chart-of-accounts-change"
  - "ISO-20022"
  - "ISO-3166-2"
  - "ISO-4217:2015 currency-codes account-currency"
  - "ISO-9362"
  - "OECD SAF-T §2 general-ledger-accounts"
  - "RFC-5545"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-210 balance-sheet"
  - "W3C-PROV-O"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - access
    - accounting
    - auth
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
  backlinks:
    - access
    - accounting
    - auth
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
signatures:
  computationUuid: "d2be3318-304b-88a7-8020-37ca9132ba7f"
  stages:
    - stage: path
      stageUuid: "7e314456-172a-833b-b65a-622e1b2c9fdd"
    - stage: trinity
      stageUuid: "4c05b5e1-1ccc-88be-aae1-8cdf9dbfbc63"
    - stage: boundary
      stageUuid: "59a8f02c-4f5c-880e-9ee2-638c41ed9528"
    - stage: links
      stageUuid: "59b67049-d5e8-85d7-b83e-466ce45a4141"
    - stage: horo
      stageUuid: "692a3e7b-a480-8cc7-b255-8ac7bbfce5f5"
    - stage: seal
      stageUuid: "b050fb19-2afc-8106-aefa-e3b6157620fe"
    - stage: uuid
      stageUuid: "61ffbadb-e89e-873c-ac1b-cd8e398729f0"
version: 2
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
