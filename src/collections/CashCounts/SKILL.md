---
name: cash-counts
description: The cash-counts collection — Cash Counts — denomination-level cash-drawer / till reconciliation
---

# cash-counts

Cash Counts — denomination-level cash-drawer / till reconciliation.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes denomination-currency
- ISO-8601-1:2019 date-time count-date
- BG Наредба Н-18 (СУПТО) daily-cash-reconciliation Z-report
- SOX §404 internal-controls cash-handling TOM-CASH-01
- ISO-19011:2018 audit-trail cash-count-evidence dual-control
- ISO-27002 §5.4 segregation-of-duties counter-vs-verifier
- ISO-27001 A.5.23 cloud-service-tenant-isolation
