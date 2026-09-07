---
name: locks
description: "Use when closing or locking accounting periods — monthly, quarterly, annual — to prevent new postings; allows reversals and prior-period adjustments; tracks who closed the period and when. The period-close gate collection."
atomPath: "period/locks"
coordinate: "period/locks · 8/crest · 4c216f40"
contentUuid: "e9336205-c030-5c56-8071-d218822a630f"
diamondUuid: "4c4e4e9a-e329-887b-8bba-e1ca62721a09"
uuid: "4c216f40-9dfa-8cc6-9472-7bcc30d9cf01"
horo: 8
typography:
  partition: period
  bondDegree: 12
standards:
  - "IFRS IAS-1 reporting-period"
  - "ISO-8601-1:2019 locked-at"
  - "ISO-8601-1:2019 locked-at`"
  - "SOX §404 period-close-integrity"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ac34877e-6275-816a-84f1-5eb1c63e7ce7"
  stages:
    - stage: path
      stageUuid: "cc1e9d80-676b-8778-8069-f436d1fe284c"
    - stage: trinity
      stageUuid: "88a8f1d3-a73a-8b7d-bc27-a0b6cf4835cb"
    - stage: boundary
      stageUuid: "4bde5354-8132-899a-9312-4b8c50260bc5"
    - stage: links
      stageUuid: "b6768726-1f07-8c78-86d0-8ae3fe4a7b14"
    - stage: horo
      stageUuid: "decde926-bcce-8ae1-8a86-415c2dbc1c1e"
    - stage: seal
      stageUuid: "af212e82-93c4-83da-9683-6e0fb9a204b2"
    - stage: uuid
      stageUuid: "2b6700b9-78ec-8fb9-bc00-5313bbbd27e9"
version: 2
---
# period-locks

PeriodLocks Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 locked-at`

- SOX §404 period-close-integrity
- IFRS IAS-1 reporting-period
- ISO-8601-1:2019 locked-at

**Law — [[law]]: a period lock is the gate that closes an accounting [[period]] to new postings while still permitting reversals and prior-period adjustments, recording who closed it and when.**
