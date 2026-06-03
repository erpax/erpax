---
name: operations
description: Use when defining reusable process-step types (Cut, Sew, Mix, Assemble, Inspect, Pack) that routings compose — with ISA-95 operation-type hierarchy, default work-center, and KPI anchors independent of any specific product. The operation-type catalog collection.
---

# operations

Operations — the reusable operation-type catalog.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment
- ISO-22400-2:2014 manufacturing-operations KPIs
- ISO-19011:2018 audit-trail operation-definition-changes
- SOX §404 internal-controls production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[hooks]] · [[accounting]] · [[standard]] · [[fields]] · [[rodin]].
