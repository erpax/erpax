---
name: leases
description: "Use when recognising and tracking IFRS 16 / ASC 842 lessee leases — ROU asset initial measurement, lease liability PV calculation, discount rate, payment frequency/timing, modifications, and period-end carrying amounts. The lease master-data collection."
atomPath: leases
coordinate: "leases · 8/crest · c6da0bd3"
contentUuid: "45d14584-9a2d-541a-bb32-92fa517080d4"
diamondUuid: "4f5c6def-fb55-80b8-999d-593faef694bb"
uuid: "c6da0bd3-b239-8ea5-9964-1b5b9896244c"
horo: 8
typography:
  partition: leases
  bondDegree: 29
standards:
  - "IFRS IFRS-16 leases lessee-recognition"
  - "IFRS IFRS-16 §22-§35 initial-measurement-rou-asset"
  - "IFRS IFRS-16 §26-§28 initial-measurement-lease-liability"
  - "IFRS IFRS-16 §29-§31 subsequent-measurement-rou"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time commencement-date end-date"
  - "ISO-8601-1:2019 date-time commencement-date end-date`"
  - "SOX §404 internal-controls capital-asset-register"
  - "US-GAAP ASC-842-20 lessee-accounting"
  - "US-GAAP ASC-842-20-25 finance-vs-operating-lease"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "eadca516-98dc-8cfb-b286-cef43c0e1e6c"
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
      stageUuid: "eea5303d-ef63-8f85-8cbc-3499b3aab9e6"
    - stage: seal
      stageUuid: "ac5a322f-1b74-8c50-a9d0-289a63b1eddf"
    - stage: uuid
      stageUuid: "b01ed38a-70b6-843d-82d6-22d31f556598"
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

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time commencement-date end-date`


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
