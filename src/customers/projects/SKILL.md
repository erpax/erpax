---
name: projects
description: "Use when tracking a customer-facing deliverable under IFRS-15 §35 over-time recognition — accumulating costs (labour via time-entries, materials via purchase-orders), measuring cost-to-cost or milestone progress, managing budget vs EAC, and closing WIP to revenue per the contract's recognition method. The IFRS-15 project anchor collection."
atomPath: "customers/projects"
coordinate: "customers/projects · 7/descent · e39b43ce"
contentUuid: "8451860e-fb07-5726-b309-a96c438492bb"
diamondUuid: "6a17ff2c-8e06-8792-a2ca-b7f0e604bd15"
uuid: "e39b43ce-4600-8c0c-9ccb-fda1b6643a78"
horo: 7
typography:
  partition: customers
  bondDegree: 19
standards:
  - "IFRS IAS-1 §125 estimation-uncertainty (project budgets)"
  - "IFRS IFRS-15 §126 milestone-billing"
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-606-10-25-27 over-time-criteria"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0d5e5020-807c-816f-8f78-07c1b6138d4a"
  stages:
    - stage: path
      stageUuid: "5d5ee3e0-c0be-8ea3-b60d-a627bc1643bf"
    - stage: trinity
      stageUuid: "f0bd19f7-545c-80cf-9947-dca1bf8052f6"
    - stage: boundary
      stageUuid: "317f2354-ee4e-8d57-bd3b-25941da1fde2"
    - stage: links
      stageUuid: "1aa8cd02-d30d-84f8-8c1e-e3555174548b"
    - stage: horo
      stageUuid: "22e67ee4-e211-8b25-a64e-a549f494b1b2"
    - stage: seal
      stageUuid: "3ebe8d7a-121a-869e-8ebd-f8862ddb6ef5"
    - stage: uuid
      stageUuid: "9098c4a2-0d21-81c8-9eb1-f16301788bd0"
version: 2
---
# projects

Projects — anchor for IFRS-15 §35 over-time revenue recognition.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IFRS-15 §35 over-time-recognition
- IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress
- IFRS IFRS-15 §126 milestone-billing
- US-GAAP ASC-606-10-25-27 over-time-criteria
- IFRS IAS-1 §125 estimation-uncertainty (project budgets)
- ISO-19011:2018 audit-trail wip-evidence
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation


Composes: [[customers/projects/project/milestones]] · [[customers/projects/project/tasks]] · [[customers/projects/wip/snapshots]].

**Law — [[law]]: open WIP equals accumulated cost minus recognised revenue, and recognition tracks cost-to-cost progress bounded by the estimate-at-completion.**
