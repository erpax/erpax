---
name: runs
description: "Use when recording actual production at one operation × work-center — quantities ordered/produced/scrapped/backordered, variant attribute axes, shift, start/completion timestamps, and ISA-95 KPIs (yield, scrap). The per-routing-step execution record within a work order."
atomPath: "items/bills/of/materials/work/orders/operation/runs"
coordinate: "items/bills/of/materials/work/orders/operation/runs · 8/crest · 10f86f81"
contentUuid: "e5251b8e-62f8-54d7-b95f-981a304e5a8d"
diamondUuid: "acd39e11-d4a5-8bcf-a99d-d47abee8552a"
uuid: "10f86f81-637a-8020-a021-3779eb4d230a"
horo: 8
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
  computationUuid: "c76e5680-ae6e-8a16-aa0e-8e6fd836e570"
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
      stageUuid: "03985cb9-810c-8814-8202-6d0a90434179"
    - stage: seal
      stageUuid: "c52a0589-2148-8dff-a5d1-141f46c5aaea"
    - stage: uuid
      stageUuid: "0f8824b1-1f05-804b-994b-dd5b4db97ad8"
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
