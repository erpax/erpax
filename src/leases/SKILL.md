---
name: leases
description: "Use when recognising and tracking IFRS 16 / ASC 842 lessee leases — ROU asset initial measurement, lease liability PV calculation, discount rate, payment frequency/timing, modifications, and period-end carrying amounts. The lease master-data collection."
atomPath: leases
coordinate: leases · 1/base · 42c06eca
contentUuid: "22946a9f-91b0-5978-8788-1a95b37b2707"
diamondUuid: "6fdb6c0f-e6fb-844f-9fbc-78dc67e11a67"
uuid: "42c06eca-a59f-8680-9e59-9a82ae17b03a"
horo: 1
bonds:
  in:
    - calculate
    - grazing
    - modifications
    - pasture
    - postings
    - properties
    - transaction
  out:
    - calculate
    - grazing
    - modifications
    - pasture
    - postings
    - properties
    - transaction
typography:
  partition: leases
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IFRS-16 leases lessee-recognition"
  - "IFRS IFRS-16 §22-§35 initial-measurement-rou-asset"
  - "IFRS IFRS-16 §26-§28 initial-measurement-lease-liability"
  - "IFRS IFRS-16 §29-§31 subsequent-measurement-rou"
  - "ISO-19011:2018 audit-trail"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time commencement-date end-date"
  - "SOX §404 internal-controls capital-asset-register"
  - "US-GAAP ASC-842-20 lessee-accounting"
  - "US-GAAP ASC-842-20-25 finance-vs-operating-lease"
bindings: []
neighbors:
  wikilink:
    - calculate
    - modifications
    - postings
    - transaction
  matrix:
    - calculate
    - grazing
    - modifications
    - pasture
    - postings
    - properties
    - transaction
  backlinks:
    - calculate
    - grazing
    - modifications
    - pasture
    - postings
    - properties
    - transaction
signatures:
  computationUuid: "a02802ef-72ea-812c-9f6f-07b3d5aff1fd"
  stages:
    - stage: path
      stageUuid: "566de06d-1065-88c3-b090-d0ec5a5a7023"
    - stage: trinity
      stageUuid: "f1d23bbb-0d06-86e9-9385-9591d382481d"
    - stage: boundary
      stageUuid: "48f9e5dd-e16a-8c4c-8a37-9c31c909e38a"
    - stage: links
      stageUuid: "07894c5d-5ce7-8252-a4f4-8b064545e334"
    - stage: horo
      stageUuid: "d11c8a1d-e6a1-8768-9d52-c28c416a1b4a"
    - stage: seal
      stageUuid: "8aeda79c-b0b9-89a9-8247-3ef60bc3488e"
    - stage: uuid
      stageUuid: "486a6d4e-1736-807b-a700-7979c373a63f"
version: 2
---
# leases

Leases — IFRS 16 / ASC 842 right-of-use asset + lease liability.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Accounting Model

Under IFRS 16 (effective 2019) the lessee recognises almost every lease as a right-of-use (ROU) asset and corresponding lease liability, with two exemptions: short-term (≤ 12 months) and low-value underlying assets. ASC 842 retains the operating/finance distinction. This collection captures the master data required to amortise both sides over the lease term:

- Lease term, [[transaction|fixed/variable payments]], [[calculate|discount rate]], currency
- Initial ROU asset measurement (§24: liability + prepayments + direct costs − incentives)
- Initial liability measurement (§26–28: PV of unpaid payments, discounted at rate implicit or incremental borrowing rate)
- Period-end carrying amounts (via [[transaction|subsequent-measurement]] cycle)

The actual interest-accretion + amortisation journal entry is posted via [[leases/lease/modifications]] and [[leases/lease/period/postings]] — same pattern as depreciation schedules for fixed assets.

## Composition

[[leases/lease/modifications]] · [[leases/lease/period/postings]].

## Standards

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time commencement-date end-date
- IFRS IFRS-16 leases lessee-recognition
- IFRS IFRS-16 §22-§35 initial-measurement-rou-asset
- IFRS IFRS-16 §26-§28 initial-measurement-lease-liability
- IFRS IFRS-16 §29-§31 subsequent-measurement-rou
- US-GAAP ASC-842-20 lessee-accounting
- US-GAAP ASC-842-20-25 finance-vs-operating-lease
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls capital-asset-register
- ISO-27001 A.5.23 cloud-service-tenant-isolation
