---
name: accounts
description: "Use when maintaining the Chart of Accounts — creating or deactivating GL accounts, assigning accountType (asset/liability/equity/revenue/expense/gain-loss), tagging canonical roles (cash, ar, ap, revenue, IFRS-16 lease accounts) for the gl-account-resolver, tracking balances, and auditing account changes. The SAF-T §2 chart-of-accounts node."
atomPath: "gl/accounts"
coordinate: "gl/accounts · 8/crest · 6ab62a98"
contentUuid: "fbd29d2f-7d06-5ba8-9eb5-687074ee137a"
diamondUuid: "1ffa7775-11e2-8b63-b7fe-262b0f05610b"
uuid: "6ab62a98-3a43-8129-b212-4011273ca21a"
horo: 8
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
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-13616-1"
  - "ISO-3166-2"
  - "ISO-4217:2015 currency-codes account-currency"
  - "ISO-4217:2015 currency-codes account-currency`"
  - "ISO-9362"
  - "OECD SAF-T §2 general-ledger-accounts"
  - "RFC-5545"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-210 balance-sheet"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "6c14c580-c411-8135-b1f1-6fcd0023f11d"
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
      stageUuid: "003a61f5-135f-852f-b13a-cca7810b4c60"
    - stage: seal
      stageUuid: "b050fb19-2afc-8106-aefa-e3b6157620fe"
    - stage: uuid
      stageUuid: "7825ba28-bfd3-8d83-b6a3-ddd7193b82f7"
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
