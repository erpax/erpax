---
name: routings
description: The routings collection — Routings — the ordered process steps that make a work-order
---

# routings

Routings — the ordered process steps that make a work-order.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISA-95:2013 / IEC-62264-1 §B.4 process-segment routing
- ISO-22400-2:2014 manufacturing-operations KPIs (cycle time)
- ISO-8601-1:2019 date-time
- IFRS IAS-2 §12 cost-of-conversion operation-time
- US-GAAP ASC-330-10-30 inventory-cost
- ISO-19011:2018 audit-trail routing-changes
- SOX §404 internal-controls production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Operations]] · [[WorkCenters]] · [[WorkOrders]] · [[accounting]] · [[hooks]] · [[access]].
