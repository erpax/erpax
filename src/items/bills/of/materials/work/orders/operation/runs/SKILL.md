---
name: operation-runs
description: Use when recording actual production at one operation × work-center — quantities ordered/produced/scrapped/backordered, variant attribute axes, shift, start/completion timestamps, and ISA-95 KPIs (yield, scrap). The per-routing-step execution record within a work order.
---

# operation-runs

Execution of one routing step on a work-order. The per-operation production record tracked by [[WorkOrders]].

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISA-95:2013 / IEC-62264-1 §B.5 production-performance work-response
- ISO-22400-2:2014 manufacturing-operations KPIs (yield, scrap)
- ISO-8601-1:2019 date-time start-completion
- ISO-19011:2018 audit-trail production-execution
- SOX §404 internal-controls production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[WorkOrders]].
