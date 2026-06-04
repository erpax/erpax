---
name: tax-periods
description: Use when managing the tax-period workflow per jurisdiction — aligning tax filing deadlines with fiscal periods, documenting transfer-pricing adjustment counts, tracking readiness (pending-closing → adjustment-posted → tax-closed), and maintaining a tamper-proof audit chain for tax-authority compliance. The per-jurisdiction tax-period workflow node.
---

# tax-periods

TaxPeriods Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- OECD tax-period-coding
- SAF-T OECD reporting-period
- ISO-8601-1:2019 period-dates
