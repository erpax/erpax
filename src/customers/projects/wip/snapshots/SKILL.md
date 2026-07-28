---
name: snapshots
description: "Use when closing a fiscal period — capturing frozen WIP evidence (cost-to-date, EAC, % complete, recognised revenue, unbilled contract asset or deferred liability) per project per period, and anchoring the accrual JE. The IFRS-15 §B14-B19 period-end WIP valuation collection."
atomPath: "customers/projects/wip/snapshots"
coordinate: "customers/projects/wip/snapshots · 4/weave · 99dfa755"
contentUuid: "90f25673-4645-5517-a69d-f424428d5ab1"
diamondUuid: "817c149b-b236-8641-94b7-1bd6c112b7a0"
uuid: "99dfa755-cae6-8825-bdd4-9805be9a3bd0"
horo: 4
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
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls revenue-recognition"
  - "US-GAAP ASC-606-10-45-1 contract-asset"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "6014b4a3-fafa-874a-b546-458925543aa8"
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
      stageUuid: "d1c61e80-1667-833a-9f9a-427b6788affa"
    - stage: seal
      stageUuid: "2647771b-d008-81cd-a9db-43b6c55798d7"
    - stage: uuid
      stageUuid: "106b5b98-1870-8a76-b12a-ad465aa31b0c"
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
