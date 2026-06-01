---
name: work-orders
description: The work-orders collection — Work Orders — production-order header + execution log
---

# work-orders

Work Orders — production-order header + execution log.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time release-due-completion-dates
- ISA-95:2013 §B.5 production-operations-management
- IFRS IAS-2 §10 §12 cost-of-conversion
- IFRS IAS-2 §13 normal-capacity-overhead-absorption
- US-GAAP ASC-330-10-30 inventory-cost
- ISO-19011:2018 audit-trail production-execution
- SOX §404 internal-controls production-control TOM-PROD-01
- ISO-27001 A.5.23 cloud-service-tenant-isolation
