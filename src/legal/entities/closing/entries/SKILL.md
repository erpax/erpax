---
name: entries
description: "Use when executing or auditing period-end close — closing P&L accounts to retained earnings, auto-generating reversing entries, locking the period, and producing an immutable close audit trail per IFRS IAS-1 / SOX §404. The period-close journal-entry collection."
atomPath: "legal/entities/closing/entries"
coordinate: "legal/entities/closing/entries · 5/round · 618968a9"
contentUuid: "3fae6996-9923-5706-bd5b-802b4e3fff49"
diamondUuid: "3cdb22cb-7443-835b-866f-0cdbeb13ae64"
uuid: "618968a9-af60-8dfe-be0e-91a29f590c65"
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
  computationUuid: "64b877a3-cf47-8ce5-8d5c-6a1ebf1ed805"
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
      stageUuid: "3f573797-4ad7-849b-b4cf-49924309f100"
    - stage: seal
      stageUuid: "8751e6d7-4ad7-826e-9e70-5844196dc9c6"
    - stage: uuid
      stageUuid: "4c1c19c9-7f9f-8099-ae35-e8967bd92925"
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
