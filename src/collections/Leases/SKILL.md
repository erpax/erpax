---
name: leases
description: The leases collection — Leases — IFRS 16 / ASC 842 right-of-use asset + lease liability
---

# leases

Leases — IFRS 16 / ASC 842 right-of-use asset + lease liability.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

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

Composes: [[LeaseModifications]] · [[LeasePeriodPostings]].
