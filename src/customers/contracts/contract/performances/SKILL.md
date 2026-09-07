---
name: performances
description: "Use when tracking performance milestones and control-transfer events that gate revenue recognition — planned vs. actual completion dates, over-time or point-in-time determination per IFRS-15 §31-35, acceptance criteria, and associated invoice link. The milestone control-transfer collection."
atomPath: "customers/contracts/contract/performances"
coordinate: "customers/contracts/contract/performances · 4/weave · 6554068d"
contentUuid: "1839a29c-59ef-5385-809e-61dee902729c"
diamondUuid: "ce0517d0-ec2e-8fdf-93d3-fae3001c1a18"
uuid: "6554068d-4b83-8813-abac-fa209c263db5"
horo: 4
typography:
  partition: customers
  bondDegree: 33
standards:
  - "ASC-606"
  - "IAS-1"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-1 presentation-of-financial-statements`"
  - "IFRS IFRS-15 §22 performance-obligations"
  - "IFRS IFRS-15 §22 performance-obligations`"
  - "IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition"
  - "IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition`"
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "IFRS IFRS-15 §35 over-time-recognition`"
  - "IFRS-15"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time completion-dates"
  - "ISO-8601-1:2019 date-time completion-dates`"
  - "SOX §404 internal-controls revenue-completeness TOM-AR-04"
  - "US-GAAP"
  - "US-GAAP ASC-606-10-25-25 performance-obligations"
  - "US-GAAP ASC-606-10-25-27 transfer-of-control"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "2d4d84bd-fb3b-89e6-b6c9-13a34d535008"
  stages:
    - stage: path
      stageUuid: "cb42c745-6dbc-87f3-aac0-82979dadd14c"
    - stage: trinity
      stageUuid: "18aa144f-8fba-8f70-84b4-546f462fd9c1"
    - stage: boundary
      stageUuid: "2789bc7c-ce0e-8993-82fa-85a4260d7c40"
    - stage: links
      stageUuid: "e3fa67ff-7cce-8031-a1a9-5f62cab2ed35"
    - stage: horo
      stageUuid: "aac2b256-cc51-8894-805e-99ee48fe10f7"
    - stage: seal
      stageUuid: "0f31a180-1b87-878a-b48c-0d791e459c3d"
    - stage: uuid
      stageUuid: "a30846af-a487-80fb-85bd-8b11a305ba35"
version: 2
---
# contract-performance

Contract Performance — IFRS-15 §31-35 control transfer & revenue recognition timing.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition`
- `@standard IFRS IFRS-15 §35 over-time-recognition`
- `@standard IFRS IFRS-15 §22 performance-obligations`
- `@standard IFRS IAS-1 presentation-of-financial-statements`
- `@standard ISO-8601-1:2019 date-time completion-dates`
- `@standard ISO-4217:2015 currency-codes`

- IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition
- IFRS IFRS-15 §35 over-time-recognition
- IFRS IFRS-15 §22 performance-obligations
- IFRS IAS-1 presentation-of-financial-statements
- US-GAAP ASC-606-10-25-25 performance-obligations
- US-GAAP ASC-606-10-25-27 transfer-of-control
- ISO-8601-1:2019 date-time completion-dates
- ISO-4217:2015 currency-codes
- SOX §404 internal-controls revenue-completeness TOM-AR-04
- ISO-19011:2018 audit-trail performance-evidence

Composes: [[customers/contracts/performance/obligations]] · [[transaction]] · [[standard]] · [[accounting]] · [[Invoices]] · [[proof]].

**Law — [[law]]: revenue is recognised only at the instant (point-in-time) or over the span (over-time) that control actually transfers, never on the planned date alone.**
