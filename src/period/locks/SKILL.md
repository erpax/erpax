---
name: locks
description: "Use when closing or locking accounting periods — monthly, quarterly, annual — to prevent new postings; allows reversals and prior-period adjustments; tracks who closed the period and when. The period-close gate collection."
atomPath: "period/locks"
coordinate: "period/locks · 5/round · e02f15be"
contentUuid: "05084afe-cad4-5540-9cd9-dd48f6917e1e"
diamondUuid: "f29a40b3-92b7-80c8-b710-347819493c3b"
uuid: "e02f15be-20bf-87c5-86e8-3cf15227883c"
horo: 5
typography:
  partition: period
  bondDegree: 9
standards:
  - "IFRS IAS-1 reporting-period"
  - "ISO-8601-1:2019 locked-at"
  - "ISO-8601-1:2019 locked-at`"
  - "SOX §404 period-close-integrity"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7b66c3b7-a12e-8b83-849c-460749b30499"
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
      stageUuid: "2aa92084-8aef-8977-97c8-b7f6426f91ec"
    - stage: seal
      stageUuid: "15d25a2e-525c-8d97-b59a-e37528f39a80"
    - stage: uuid
      stageUuid: "e7489a78-8388-80eb-8158-efd844fc6852"
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
