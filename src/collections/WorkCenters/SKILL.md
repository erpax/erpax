---
name: work-centers
description: The work-centers collection — Work Centers — the capacity unit production flows through
---

# work-centers

Work Centers — the capacity unit production flows through.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISA-95:2013 / IEC-62264-1 §B.5 production-resources equipment-hierarchy
- ISO-22400-2:2014 manufacturing-operations KPIs (capacity, availability, utilization)
- ISO-8601-1:2019 date-time
- IFRS IAS-2 §12 cost-of-conversion fixed-and-variable-production-overhead
- IFRS IAS-2 §13 normal-capacity-overhead-absorption
- US-GAAP ASC-330-10-30 inventory-cost
- ISO-19011:2018 audit-trail capacity-resource-changes
- SOX §404 internal-controls production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[WorkShifts]] · [[manufacturing]] · [[accounting]].
