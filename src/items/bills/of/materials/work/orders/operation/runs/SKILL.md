---
name: runs
description: "Use when recording actual production at one operation × work-center — quantities ordered/produced/scrapped/backordered, variant attribute axes, shift, start/completion timestamps, and ISA-95 KPIs (yield, scrap). The per-routing-step execution record within a work order."
atomPath: "items/bills/of/materials/work/orders/operation/runs"
coordinate: "items/bills/of/materials/work/orders/operation/runs · 5/round · 08aca1ee"
contentUuid: "8310844b-1888-5d1c-9510-46745726d5a9"
diamondUuid: "c9e244e0-e56e-8e1f-8587-4719e286f290"
uuid: "08aca1ee-f1a7-8acc-9319-5fa4077d29b2"
horo: 5
typography:
  partition: items
  bondDegree: 42
standards:
  - "EU-537/2014"
  - "EU-910/2014"
  - "IFRS IAS-2 §12 cost-of-conversion"
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.5 production-performance work-response"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations KPIs (yield, scrap)"
  - "ISO-22400-2:2014 manufacturing-operations KPIs (yield, scrap)`"
  - "ISO-8601-1:2019 date-time start-completion"
  - "ISO-8601-1:2019 date-time start-completion`"
  - "SOX §404 internal-controls production-control"
  - "US-GAAP ASC-330-10-30 inventory-cost"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "407c2390-72b5-84ea-af74-d26a8e0d73ec"
  stages:
    - stage: path
      stageUuid: "dfc7a5d2-4c1b-872f-9ee1-6b0b2e4412bd"
    - stage: trinity
      stageUuid: "a750d823-57c6-829e-9c69-5b1068c58a8a"
    - stage: boundary
      stageUuid: "6b1622d5-6b1d-8520-b1d0-01f7cd135605"
    - stage: links
      stageUuid: "3ac9e96c-737f-8e83-8a37-6dfaec0bd75f"
    - stage: horo
      stageUuid: "99c7903f-4ca0-88d9-93e4-53dabdbad0cd"
    - stage: seal
      stageUuid: "c52a0589-2148-8dff-a5d1-141f46c5aaea"
    - stage: uuid
      stageUuid: "9476499c-f9c1-86b2-9a86-73687407d416"
version: 2
---
# operation-runs

Execution of one routing step on a work-order. The per-operation production record tracked by [[work/orders|WorkOrders]].

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-22400-2:2014 manufacturing-operations KPIs (yield, scrap)`
- `@standard ISO-8601-1:2019 date-time start-completion`

- ISA-95:2013 / IEC-62264-1 §B.5 production-performance work-response
- ISO-22400-2:2014 manufacturing-operations KPIs (yield, scrap)
- ISO-8601-1:2019 date-time start-completion
- ISO-19011:2018 audit-trail production-execution
- SOX §404 internal-controls production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the execution record of one routing step on a [[work/orders|work order]] — quantities ordered/produced/scrapped/backordered at one operation × work-center, yielding the ISA-95 yield and scrap KPIs.**

Composes: [[work/orders|WorkOrders]].
