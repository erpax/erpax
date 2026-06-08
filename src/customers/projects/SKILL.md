---
name: projects
description: "Use when tracking a customer-facing deliverable under IFRS-15 §35 over-time recognition — accumulating costs (labour via time-entries, materials via purchase-orders), measuring cost-to-cost or milestone progress, managing budget vs EAC, and closing WIP to revenue per the contract's recognition method. The IFRS-15 project anchor collection."
atomPath: customers/projects
coordinate: customers/projects · 7/descent · 06cbb2ac
contentUuid: "e3e70f48-26b1-534b-8d80-25c76043e8b7"
diamondUuid: "b3d0bd88-5077-8732-8e85-4cb28c12a041"
uuid: "06cbb2ac-d5b3-8242-91f3-918531f998d5"
horo: 7
bonds:
  in:
    - customers
    - law
    - milestones
    - reports
    - roadmap
    - snapshots
    - tasks
  out:
    - law
    - milestones
    - reports
    - roadmap
    - snapshots
    - tasks
typography:
  partition: customers
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IAS-1 §125 estimation-uncertainty (project budgets)"
  - "IFRS IFRS-15 §126 milestone-billing"
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress"
  - "ISO-19011:2018 audit-trail wip-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-606-10-25-27 over-time-criteria"
bindings: []
neighbors:
  wikilink:
    - law
    - milestones
    - snapshots
    - tasks
  matrix:
    - law
    - milestones
    - reports
    - roadmap
    - snapshots
    - tasks
  backlinks:
    - law
    - milestones
    - reports
    - roadmap
    - snapshots
    - tasks
signatures:
  computationUuid: "7e04a071-093b-829d-b2b2-eae7052d267c"
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
      stageUuid: "f5e6517b-c097-8ed8-9b15-674c358211ea"
    - stage: seal
      stageUuid: "055cf2b0-6922-8dc2-b7b7-9596ed21afc5"
    - stage: uuid
      stageUuid: "0469877e-1f4e-8f5d-b8bc-99cafa35336f"
version: 2
---
# projects

Projects — anchor for IFRS-15 §35 over-time revenue recognition.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
