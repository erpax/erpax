---
name: leases
description: The leases collection — Leases — IFRS 16 / ASC 842 right-of-use asset + lease liability
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

The actual interest-accretion + amortisation journal entry is posted via [[LeaseModifications]] and [[LeasePeriodPostings]] — same pattern as depreciation schedules for fixed assets.

## Composition

[[LeaseModifications]] · [[LeasePeriodPostings]].

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
