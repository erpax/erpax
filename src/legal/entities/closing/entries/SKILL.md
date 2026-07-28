---
name: entries
description: "Use when executing or auditing period-end close — closing P&L accounts to retained earnings, auto-generating reversing entries, locking the period, and producing an immutable close audit trail per IFRS IAS-1 / SOX §404. The period-close journal-entry collection."
atomPath: "legal/entities/closing/entries"
coordinate: "legal/entities/closing/entries · 5/round · fa8ec8fc"
contentUuid: "ff6b8578-6fff-5672-bd39-dc333973432d"
diamondUuid: "ba99520c-b5a8-8726-83b0-80d288b28be8"
uuid: "fa8ec8fc-f8ea-8057-bab8-282051ef26d0"
horo: 5
bonds:
  in:
    - accounting
    - accrual
    - adjustments
    - assets
    - bookings
    - classifications
    - closing
    - combinations
    - cycles
    - deduction
    - deferral
    - deferredrevenue
    - elimination
    - eliminations
    - events
    - harvest
    - identity
    - journals
    - law
    - modifications
    - orders
    - postings
    - prepaid
    - proof
    - provision
    - recognition
    - reconciliations
    - refunds
    - runs
    - sales
    - standard
    - transactions
  out:
    - accounting
    - accrual
    - adjustments
    - assets
    - bookings
    - classifications
    - combinations
    - cycles
    - deduction
    - deferral
    - deferredrevenue
    - elimination
    - eliminations
    - events
    - harvest
    - identity
    - journals
    - law
    - modifications
    - orders
    - postings
    - prepaid
    - proof
    - provision
    - recognition
    - reconciliations
    - refunds
    - runs
    - sales
    - standard
    - transactions
typography:
  partition: legal
  bondDegree: 113
  neighbors: []
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "SOX §404 period-close-integrity"
  - "US-GAAP ASC-205 presentation"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - accounting
    - accrual
    - adjustments
    - assets
    - bookings
    - classifications
    - combinations
    - cycles
    - deduction
    - deferral
    - deferredrevenue
    - elimination
    - eliminations
    - events
    - harvest
    - identity
    - journals
    - law
    - modifications
    - orders
    - postings
    - prepaid
    - proof
    - provision
    - recognition
    - reconciliations
    - refunds
    - runs
    - sales
    - standard
    - transactions
  backlinks:
    - accounting
    - accrual
    - adjustments
    - assets
    - bookings
    - classifications
    - combinations
    - cycles
    - deduction
    - deferral
    - deferredrevenue
    - elimination
    - eliminations
    - events
    - harvest
    - identity
    - journals
    - law
    - modifications
    - orders
    - postings
    - prepaid
    - proof
    - provision
    - recognition
    - reconciliations
    - refunds
    - runs
    - sales
    - standard
    - transactions
signatures:
  computationUuid: "a7b9c07d-e9e7-834d-a8df-e326eb8b6199"
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
      stageUuid: "598f58c3-a0fc-876f-8016-25518299ac70"
    - stage: seal
      stageUuid: "8751e6d7-4ad7-826e-9e70-5844196dc9c6"
    - stage: uuid
      stageUuid: "6fa9d684-c920-866a-ac11-a73c9968e7c0"
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
