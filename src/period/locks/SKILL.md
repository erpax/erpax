---
name: locks
description: "Use when closing or locking accounting periods — monthly, quarterly, annual — to prevent new postings; allows reversals and prior-period adjustments; tracks who closed the period and when. The period-close gate collection."
atomPath: "period/locks"
coordinate: "period/locks · 8/crest · faae7f50"
contentUuid: "f117ea29-6611-51d1-9096-0a922180a7a2"
diamondUuid: "5b6fffbc-7139-8b16-a687-3a4930137185"
uuid: "faae7f50-e484-8de8-8530-1a7f3aa00df6"
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
  computationUuid: "6548f11a-c13d-8039-8fea-c716e746ed3f"
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
      stageUuid: "dfdbd6e3-350e-85e2-a44e-da38e732b6e9"
    - stage: seal
      stageUuid: "af212e82-93c4-83da-9683-6e0fb9a204b2"
    - stage: uuid
      stageUuid: "4762bc5f-5ddb-8046-9f77-e56510739dde"
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
