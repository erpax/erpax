---
name: snapshots
description: "Use when closing a fiscal period — capturing frozen WIP evidence (cost-to-date, EAC, % complete, recognised revenue, unbilled contract asset or deferred liability) per project per period, and anchoring the accrual JE. The IFRS-15 §B14-B19 period-end WIP valuation collection."
atomPath: customers/projects/wip/snapshots
coordinate: customers/projects/wip/snapshots · 7/descent · 23f12d2c
contentUuid: "45141eb1-f710-568c-878f-1ffc19078d1f"
diamondUuid: "c02bb7c7-7df7-8055-9890-0374de660e28"
uuid: "23f12d2c-5fb9-8adf-86f4-334ceb670d08"
horo: 7
bonds:
  in:
    - accounting
    - adjustments
    - law
    - periods
    - projects
    - standard
    - transaction
  out:
    - accounting
    - adjustments
    - law
    - periods
    - projects
    - standard
    - transaction
typography:
  partition: customers
  bondDegree: 28
  neighbors: []
standards:
  - "IFRS IFRS-15 §107 §108 §109 contract-asset-contract-liability"
  - "IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress"
  - "ISO-19011:2018 audit-trail wip-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls revenue-recognition"
  - "US-GAAP ASC-606-10-45-1 contract-asset"
bindings: []
neighbors:
  wikilink:
    - accounting
    - adjustments
    - law
    - periods
    - projects
    - standard
    - transaction
  matrix:
    - accounting
    - adjustments
    - law
    - periods
    - projects
    - standard
    - transaction
  backlinks:
    - accounting
    - adjustments
    - law
    - periods
    - projects
    - standard
    - transaction
signatures:
  computationUuid: "022772f0-a453-866c-877f-4f8f0ea4a7f0"
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
      stageUuid: "28944b8f-240e-8485-bd47-cce94cce1f0f"
    - stage: seal
      stageUuid: "2647771b-d008-81cd-a9db-43b6c55798d7"
    - stage: uuid
      stageUuid: "d63a5440-7590-85a3-b04b-f19a8adcbe40"
version: 2
---
# wip-snapshots

WIP Snapshots — periodic Work-in-Progress valuation per project.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
