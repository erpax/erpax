---
name: operation-runs
description: The operation-runs collection — Operation Runs — execution of one routing step on a work-order
---

# operation-runs

Operation Runs — execution of one routing step on a work-order.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISA-95:2013 / IEC-62264-1 §B.5 production-performance work-response
- ISO-22400-2:2014 manufacturing-operations KPIs (yield, scrap)
- ISO-8601-1:2019 date-time start-completion
- IFRS IAS-2 §12 cost-of-conversion
- US-GAAP ASC-330-10-30 inventory-cost
- ISO-19011:2018 audit-trail production-execution
- SOX §404 internal-controls production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[manufacturing]] · [[WorkOrders]].
