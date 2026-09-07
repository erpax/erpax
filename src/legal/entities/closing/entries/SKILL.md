---
name: entries
description: "Use when executing or auditing period-end close — closing P&L accounts to retained earnings, auto-generating reversing entries, locking the period, and producing an immutable close audit trail per IFRS IAS-1 / SOX §404. The period-close journal-entry collection."
atomPath: "legal/entities/closing/entries"
coordinate: "legal/entities/closing/entries · 2/share · 0164e641"
contentUuid: "c894bb56-b7f4-5dca-889f-1807c974cf51"
diamondUuid: "1984024b-1869-8fe0-8533-d721f25b8806"
uuid: "0164e641-cc84-8eab-8686-b88b9ece1649"
horo: 2
typography:
  partition: legal
  bondDegree: 113
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "SOX §404 period-close-integrity"
  - "US-GAAP ASC-205 presentation"
bindings: []
signatures:
  computationUuid: "c8411776-0d29-88fb-9a8c-468dca1f3bf1"
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
      stageUuid: "51583687-7e54-8d75-a8a8-916b9f8e6822"
    - stage: seal
      stageUuid: "8751e6d7-4ad7-826e-9e70-5844196dc9c6"
    - stage: uuid
      stageUuid: "6814645f-9e23-8ffd-b820-3b6b7a68a4cb"
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
