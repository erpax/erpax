---
name: runs
description: "Use when recording actual production at one operation × work-center — quantities ordered/produced/scrapped/backordered, variant attribute axes, shift, start/completion timestamps, and ISA-95 KPIs (yield, scrap). The per-routing-step execution record within a work order."
atomPath: items/bills/of/materials/work/orders/operation/runs
coordinate: items/bills/of/materials/work/orders/operation/runs · 5/round · 5ea83e66
contentUuid: "abd3ff90-b43c-5019-8357-e7d56ce7cd13"
diamondUuid: "467a3b07-4be9-86a0-91a1-5e3952813c25"
uuid: "5ea83e66-8e06-8cfc-b697-3a9b057dd1e6"
horo: 5
bonds:
  in:
    - accounting
    - accounts
    - mandates
    - operation
    - proof
    - runs
    - standard
    - transaction
  out:
    - accounting
    - accounts
    - mandates
    - proof
    - runs
    - standard
    - transaction
typography:
  partition: items
  bondDegree: 41
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "IFRS IAS-2 §12 cost-of-conversion"
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.5 production-performance work-response"
  - "ISO-19011:2018 audit-trail production-execution"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations KPIs (yield, scrap)"
  - "ISO-8601-1:2019 date-time start-completion"
  - "SOX §404 internal-controls production-control"
  - "US-GAAP ASC-330-10-30 inventory-cost"
bindings: []
neighbors:
  wikilink:
    - law
    - orders
  matrix:
    - accounting
    - accounts
    - mandates
    - proof
    - runs
    - standard
    - transaction
  backlinks:
    - accounting
    - accounts
    - mandates
    - proof
    - runs
    - standard
    - transaction
signatures:
  computationUuid: "4e3860e8-ee81-8e64-8f8f-87b2924bd346"
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
      stageUuid: "ae66da13-c21f-8ca7-b9d4-5dcc83cdb388"
    - stage: seal
      stageUuid: "c52a0589-2148-8dff-a5d1-141f46c5aaea"
    - stage: uuid
      stageUuid: "fefb0f2d-20fe-8962-8ee5-98082a9ab007"
version: 2
---
# operation-runs

Execution of one routing step on a work-order. The per-operation production record tracked by [[work/orders|WorkOrders]].

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

**Law — [[law]]: the execution record of one routing step on a [[work/orders|work order]] — quantities ordered/produced/scrapped/backordered at one operation × work-center, yielding the ISA-95 yield and scrap KPIs.**

Composes: [[work/orders|WorkOrders]].
