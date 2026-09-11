---
name: locks
description: "Use when closing or locking accounting periods — monthly, quarterly, annual — to prevent new postings; allows reversals and prior-period adjustments; tracks who closed the period and when. The period-close gate collection."
atomPath: "period/locks"
coordinate: "period/locks · 5/round · e02f15be"
contentUuid: "ac987d1e-5f14-5148-8577-a36a37fea37b"
diamondUuid: "0b873d2a-a1a4-87f7-826b-e7e784738976"
uuid: "e02f15be-20bf-87c5-86e8-3cf15227883c"
horo: 5
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
  computationUuid: "cec03478-1c5d-897c-8073-d7bb48c87c1a"
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
      stageUuid: "dc32c5c0-550f-8294-b0ef-2b8b2ac43051"
    - stage: seal
      stageUuid: "af212e82-93c4-83da-9683-6e0fb9a204b2"
    - stage: uuid
      stageUuid: "95a6b150-b039-8600-91b8-d2b55f50ba3f"
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
