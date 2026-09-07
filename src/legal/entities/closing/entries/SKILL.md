---
name: entries
description: "Use when executing or auditing period-end close — closing P&L accounts to retained earnings, auto-generating reversing entries, locking the period, and producing an immutable close audit trail per IFRS IAS-1 / SOX §404. The period-close journal-entry collection."
atomPath: "legal/entities/closing/entries"
coordinate: "legal/entities/closing/entries · 5/round · 20d3fe2a"
contentUuid: "c428c44f-bc83-5a76-be42-7ca24164b836"
diamondUuid: "5b6b2664-d2c8-8dbb-8db3-d5c94a316d40"
uuid: "20d3fe2a-4160-85d8-8af7-f7ba9dcefb92"
horo: 5
typography:
  partition: legal
  bondDegree: 113
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "SOX §404 period-close-integrity"
  - "US-GAAP ASC-205 presentation"
bindings: []
signatures:
  computationUuid: "7cd098e0-03a5-8ecd-8926-3c8fead5ac2a"
  stages:
    - stage: path
      stageUuid: "0b6a5b9d-3f38-825c-9636-6c6279aff0ad"
    - stage: trinity
      stageUuid: "c7d03af6-3f07-811e-964b-2d463f03d1e9"
    - stage: boundary
      stageUuid: "e3c29187-32f8-8699-90fa-33054a76a230"
    - stage: links
      stageUuid: "8507a562-ffd6-8849-b503-b12040f159a9"
    - stage: horo
      stageUuid: "b5dcf00f-299f-88c1-a4bf-207be45a15bd"
    - stage: seal
      stageUuid: "8751e6d7-4ad7-826e-9e70-5844196dc9c6"
    - stage: uuid
      stageUuid: "fc5695ff-0ce3-8c09-a7ca-49c92d48bfe3"
version: 2
---
# closing-entries

ClosingEntries Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS IAS-1 presentation-of-financial-statements
- US-GAAP ASC-205 presentation
- SOX §404 period-close-integrity

**Law — [[law]]: period-end close zeroes the P&L accounts to retained earnings, auto-generates the reversing entries, locks the period, and leaves an immutable close audit trail.**
