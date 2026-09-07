---
name: snapshots
description: "Use when closing a fiscal period — capturing frozen WIP evidence (cost-to-date, EAC, % complete, recognised revenue, unbilled contract asset or deferred liability) per project per period, and anchoring the accrual JE. The IFRS-15 §B14-B19 period-end WIP valuation collection."
atomPath: "customers/projects/wip/snapshots"
coordinate: "customers/projects/wip/snapshots · 8/crest · afd6f408"
contentUuid: "a75edf06-bae8-56a2-8175-21c91f9556a0"
diamondUuid: "90698f91-3b3f-83ff-8f61-9a8cbc94088d"
uuid: "afd6f408-61fc-8cf3-88fd-394d83a0e45a"
horo: 8
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
  computationUuid: "20d28cc0-e165-8ea7-84a4-f8c9c08e5477"
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
      stageUuid: "1a0c46d0-c585-8830-a8fd-236443befa3f"
    - stage: seal
      stageUuid: "2647771b-d008-81cd-a9db-43b6c55798d7"
    - stage: uuid
      stageUuid: "bfab8a5b-7984-86a0-a62f-6d883b964d14"
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
