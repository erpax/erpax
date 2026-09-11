---
name: leases
description: "Use when recognising and tracking IFRS 16 / ASC 842 lessee leases — ROU asset initial measurement, lease liability PV calculation, discount rate, payment frequency/timing, modifications, and period-end carrying amounts. The lease master-data collection."
atomPath: leases
coordinate: "leases · 4/weave · 50b7bcb5"
contentUuid: "dcef9567-94e4-5777-8457-2d2d689ec9ff"
diamondUuid: "82ee2849-d493-800e-ab17-e69cd7fa1833"
uuid: "50b7bcb5-defe-8234-9f8c-1d70ad89728c"
horo: 4
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
  computationUuid: "443679bf-d69e-8029-89f4-b9f89f0c558b"
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
      stageUuid: "991761e1-0308-8de6-8117-de94bb1230cf"
    - stage: seal
      stageUuid: "ac5a322f-1b74-8c50-a9d0-289a63b1eddf"
    - stage: uuid
      stageUuid: "7a127b2e-0664-8db3-81bd-b261ebbb41c8"
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
