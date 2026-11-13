---
name: projects
description: "Use when tracking a customer-facing deliverable under IFRS-15 §35 over-time recognition — accumulating costs (labour via time-entries, materials via purchase-orders), measuring cost-to-cost or milestone progress, managing budget vs EAC, and closing WIP to revenue per the contract's recognition method. The IFRS-15 project anchor collection."
atomPath: "customers/projects"
coordinate: "customers/projects · 4/weave · e1745521"
contentUuid: "0a2e6260-3d7e-5336-bdab-4123ee78503b"
diamondUuid: "71268dd9-51e4-8142-a375-e1a1dd744425"
uuid: "e1745521-8721-88fd-8f78-32a60a78a83f"
horo: 4
typography:
  partition: customers
  bondDegree: 16
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
  computationUuid: "bcb31c5f-5be2-8378-a3e7-f2d22332f422"
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
      stageUuid: "c7448e52-5e69-85db-a57f-4166e2a50de8"
    - stage: seal
      stageUuid: "3ebe8d7a-121a-869e-8ebd-f8862ddb6ef5"
    - stage: uuid
      stageUuid: "082097bb-cd5f-8abb-94b4-ec9b9cd8bb4e"
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
