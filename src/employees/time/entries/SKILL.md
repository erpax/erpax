---
name: entries
description: "Use when logging daily employee work time — regular hours, overtime, night shifts, PTO, sick and parental leave — with kind-based GL allocation, billable-rate project costing, approval workflow, and payroll-run linkage for IAS-19 variable pay. The daily time-entry collection."
atomPath: employees/time/entries
coordinate: employees/time/entries · 1/base · d9e0132b
contentUuid: "0b308094-ae13-5ce9-8922-f9faf4df09b4"
diamondUuid: "9a6560b1-4cd9-8057-9a9f-280a5b9e05a4"
uuid: "d9e0132b-e72c-80cb-8e24-366602ff56ec"
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
    - time
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
  partition: employees
  bondDegree: 113
  neighbors: []
standards:
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IAS-19 employee-benefits short-term"
  - "ISO-19011:2018 audit-trail time-tracking-evidence"
  - "ISO-4217:2015 currency-codes hourly-rate"
  - "ISO-8601-1:2019 date-time work-date"
  - "SOX §404 internal-controls payroll-evidence"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers performance-obligation-progress"
  - "US-GAAP ASC-710 compensation-general"
bindings: []
neighbors:
  wikilink:
    - accounting
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
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
  computationUuid: "ce90cacb-3d5c-8933-a626-188a8333dc74"
  stages:
    - stage: path
      stageUuid: "1b92ceef-4dfe-8d92-a351-672b766c8203"
    - stage: trinity
      stageUuid: "d8f94d76-bb1a-8c98-b6ef-71e0de3e6aec"
    - stage: boundary
      stageUuid: "ce3f9bf8-0ca4-83fa-a3b8-9f574d3edacd"
    - stage: links
      stageUuid: "f00b89f2-9089-8ef9-924c-04afbc163542"
    - stage: horo
      stageUuid: "b1963433-8467-8e58-97bf-08b1781179e1"
    - stage: seal
      stageUuid: "7c708ada-c129-830e-85f8-59de4f192e14"
    - stage: uuid
      stageUuid: "b8514396-673f-8b07-9051-b634117da44c"
version: 2
---
# time-entries

Time Entries — per-day / per-task time records for payroll + project costing.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: one row per day/task of employee work time — its kind drives GL allocation and billable-rate project costing, gated by approval and linked to a payroll run for IAS-19 variable pay; a single-folder collection node (no scatter, no drift).**

## Standards
- ISO-8601-1:2019 date-time work-date
- ISO-4217:2015 currency-codes hourly-rate
- IFRS IAS-19 employee-benefits short-term
- US-GAAP ASC-710 compensation-general
- US-GAAP ASC-606 revenue-from-contracts-with-customers performance-obligation-progress
- ISO-19011:2018 audit-trail time-tracking-evidence
- SOX §404 internal-controls payroll-evidence
- GDPR Art.6(1)(b) lawful-basis-contract
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[standard]] · [[proof]] · [[horo]].
