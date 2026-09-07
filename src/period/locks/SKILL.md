---
name: locks
description: "Use when closing or locking accounting periods — monthly, quarterly, annual — to prevent new postings; allows reversals and prior-period adjustments; tracks who closed the period and when. The period-close gate collection."
atomPath: "period/locks"
coordinate: "period/locks · 7/descent · fe8570ea"
contentUuid: "c5e2093b-0962-5169-88ab-8a1654079dd2"
diamondUuid: "1251554a-9c5f-86d0-8970-fceb9d375044"
uuid: "fe8570ea-8b06-88dc-a9c1-a8458628de2b"
horo: 7
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
  computationUuid: "4be7e8f7-737b-87c8-8fc5-fd5e6bfb56c1"
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
      stageUuid: "aee0997b-67cc-8572-8765-faea12564751"
    - stage: seal
      stageUuid: "af212e82-93c4-83da-9683-6e0fb9a204b2"
    - stage: uuid
      stageUuid: "20cab892-8d1c-8a2d-9756-4da979c964d1"
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
