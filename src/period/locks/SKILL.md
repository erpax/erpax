---
name: locks
description: "Use when closing or locking accounting periods — monthly, quarterly, annual — to prevent new postings; allows reversals and prior-period adjustments; tracks who closed the period and when. The period-close gate collection."
atomPath: period/locks
coordinate: period/locks · 7/descent · 40816439
contentUuid: "966313c4-8688-53e0-b220-92d74ed9aaef"
diamondUuid: "92c36ac1-5183-8926-8ea4-d91902f72d7c"
uuid: "40816439-29ba-8087-9ecf-f65422c00778"
horo: 7
bonds:
  in:
    - accounting
    - law
    - lock
    - period
  out:
    - accounting
    - law
    - lock
    - period
typography:
  partition: period
  bondDegree: 12
  neighbors: []
standards:
  - "IFRS IAS-1 reporting-period"
  - "ISO-8601-1:2019 locked-at"
  - "SOX §404 period-close-integrity"
bindings: []
neighbors:
  wikilink:
    - law
    - period
  matrix:
    - accounting
    - law
    - lock
    - period
  backlinks:
    - accounting
    - law
    - lock
    - period
signatures:
  computationUuid: "74dd2c0c-adc7-8585-acdc-07a06fd78cdc"
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
      stageUuid: "56b18157-f643-8460-9cf7-a5793ba4a68e"
    - stage: seal
      stageUuid: "15d25a2e-525c-8d97-b59a-e37528f39a80"
    - stage: uuid
      stageUuid: "41874b27-d82b-8cf6-a23a-07eeb5834a18"
version: 2
---
# period-locks

PeriodLocks Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SOX §404 period-close-integrity
- IFRS IAS-1 reporting-period
- ISO-8601-1:2019 locked-at

**Law — [[law]]: a period lock is the gate that closes an accounting [[period]] to new postings while still permitting reversals and prior-period adjustments, recording who closed it and when.**
