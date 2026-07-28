---
name: entries
description: "Use when creating or auditing double-entry accounting records — balanced debit/credit lines, entry/posted/approval dates, period-lock enforcement, posted-immutability, and segregation-of-duties (creator ≠ approver). The core GL write target per IAS-1 and OECD SAF-T §3."
atomPath: "journal/entries"
coordinate: "journal/entries · 1/base · 448b4c9d"
contentUuid: "69ca2698-6baf-5876-98af-9b45dab73a06"
diamondUuid: "46461c75-7e79-8adb-95a0-d2853c3a267b"
uuid: "448b4c9d-bf3f-810d-96d7-41f90b39ee1b"
horo: 1
bonds:
  in:
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
    - journal
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
  partition: journal
  bondDegree: 0
  neighbors: []
standards:
  - "ECMA-262"
  - "IEEE-754"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-8601-1:2019 date-time entry-date posted-date approval-date"
  - "ISO-8601-1:2019 date-time entry-date posted-date approval-date`"
  - "OECD SAF-T §3 journal-entries"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-105 generally-accepted-accounting-principles"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - adjustments
    - identity
    - law
    - proof
    - standard
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
  computationUuid: "c71866e9-13ec-8dd8-8c08-3852615e6e56"
  stages:
    - stage: path
      stageUuid: "e1568b51-9231-8c31-b451-33e00acace8d"
    - stage: trinity
      stageUuid: "15c88970-ff9c-8eff-b12d-0b958e89b9a1"
    - stage: boundary
      stageUuid: "e9242311-f2d2-8962-8ac7-d60beb263be4"
    - stage: links
      stageUuid: "d8a582b9-24ef-8760-a424-e9bb0b3974d0"
    - stage: horo
      stageUuid: "37203637-262d-85b6-aa9d-8a54afeeca56"
    - stage: seal
      stageUuid: "4d94095d-dde8-88d1-806a-155fee347f61"
    - stage: uuid
      stageUuid: "7cb9b4f9-90db-842b-9d2b-055b7b11344d"
version: 2
---
# journal-entries

Journal Entries — double-entry-bookkeeping write target.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time entry-date posted-date approval-date`

- ISO-8601-1:2019 date-time entry-date posted-date approval-date
- IFRS IAS-1 presentation-of-financial-statements
- US-GAAP ASC-105 generally-accepted-accounting-principles
- OECD SAF-T §3 journal-entries
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §5.4 segregation-of-duties

Composes: [[journal/entries/rounding/adjustments]] · [[accounting]] · [[standard]] · [[proof]] · [[identity]].

**Law — [[law]]: every entry's debits equal its credits, creator never equals approver, and once posted it is immutable within its locked period.**
