---
name: snapshots
description: "Use when closing a fiscal period — capturing frozen WIP evidence (cost-to-date, EAC, % complete, recognised revenue, unbilled contract asset or deferred liability) per project per period, and anchoring the accrual JE. The IFRS-15 §B14-B19 period-end WIP valuation collection."
atomPath: "customers/projects/wip/snapshots"
coordinate: "customers/projects/wip/snapshots · 4/weave · 78197b6a"
contentUuid: "2c93b7c0-9c5f-5d89-84d8-9ed5bbb5741e"
diamondUuid: "0f27bd2b-3e08-8a37-ae5c-6416f078a980"
uuid: "78197b6a-fe3a-840e-a5eb-41bc9834fa13"
horo: 4
typography:
  partition: customers
  bondDegree: 28
standards:
  - "IFRS IFRS-15 §107 §108 §109 contract-asset-contract-liability"
  - "IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls revenue-recognition"
  - "US-GAAP ASC-606-10-45-1 contract-asset"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "51b48a57-337e-888d-a9f2-1ca1662a8a11"
  stages:
    - stage: path
      stageUuid: "101a639d-62dd-81b8-b23a-3a2e312b42ce"
    - stage: trinity
      stageUuid: "5a1e994a-e0a2-8c71-b87a-95df20ccbdf1"
    - stage: boundary
      stageUuid: "a888de0d-4e0e-8bb4-9f40-71a1830ecfb0"
    - stage: links
      stageUuid: "8e63b2a0-94f6-8b62-bc00-a66a44eee0e6"
    - stage: horo
      stageUuid: "963ffa4f-98cb-8637-baa2-018e519512a8"
    - stage: seal
      stageUuid: "2647771b-d008-81cd-a9db-43b6c55798d7"
    - stage: uuid
      stageUuid: "3e0330b1-3c35-872f-9e01-81aa9f2a1a0a"
version: 2
---
# wip-snapshots

WIP Snapshots — periodic Work-in-Progress valuation per project.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress
- IFRS IFRS-15 §107 §108 §109 contract-asset-contract-liability
- US-GAAP ASC-606-10-45-1 contract-asset
- ISO-19011:2018 audit-trail wip-evidence
- SOX §404 internal-controls revenue-recognition
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[Projects]] · [[gl/accounts/period/end/adjustments]] · [[fiscal/periods]] · [[standard]].

**Law — [[law]]: each closed period freezes one immutable WIP valuation per project (cost-to-date, EAC, % complete, contract asset/liability) whose accrual JE balances — a sealed snapshot, never re-opened or recomputed.**
