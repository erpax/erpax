---
name: work-shifts
description: Use when recording manufacturing labor — worker × work-center × shift — capturing run-time, quantity produced, scrap, and parallelism-aware wage (runTimeMinutes/60 × rate / parallelism) that feeds IAS-2 cost-of-conversion inventory costing. The production work-shift collection.
---

# work-shifts

Work Shifts — labor/time/cost roll-up for a worker at a work-center.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISA-95:2013 / IEC-62264-1 §B.5 personnel + production-performance
- ISO-22400-2:2014 manufacturing-operations KPIs (labor utilization, OEE)
- ISO-8601-1:2019 date-time shift-start-end
- ILO C001 hours-of-work
- IFRS IAS-2 §12 cost-of-conversion direct-labor
- US-GAAP ASC-330-10-30 inventory-cost
- ISO-19011:2018 audit-trail labor-recording
- SOX §404 internal-controls payroll-and-production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[manufacturing]] · [[accounting]] · [[identity]] · [[proof]] · [[transaction]] · [[standard]].
