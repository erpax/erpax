---
name: period-locks
description: Use when closing or locking accounting periods — monthly, quarterly, annual — to prevent new postings; allows reversals and prior-period adjustments; tracks who closed the period and when. The period-close gate collection.
---

# period-locks

PeriodLocks Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SOX §404 period-close-integrity
- IFRS IAS-1 reporting-period
- ISO-8601-1:2019 locked-at
