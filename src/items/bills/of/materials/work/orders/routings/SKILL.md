---
name: routings
description: "Use when sequencing the process steps for a work order — operation type, work center, setup time, run-time per unit, UoM, and IAS-2 cost-of-conversion from cycle time. The ordered routing-step collection — the second universal manufacturing primitive alongside the BOM."
atomPath: items/bills/of/materials/work/orders/routings
coordinate: items/bills/of/materials/work/orders/routings · 4/weave · 1970a2ee
contentUuid: "69a4c6d9-9cb0-5efe-8ac4-6eb75dc60420"
diamondUuid: "75071fef-4be8-8ef3-a659-b4d6c2035e9d"
uuid: "1970a2ee-f3c9-8ae2-9d1b-48fb7038be12"
horo: 4
bonds:
  in:
    - access
    - accounting
    - centers
    - hooks
    - law
    - operations
    - orders
  out:
    - access
    - accounting
    - centers
    - hooks
    - law
    - operations
    - orders
typography:
  partition: items
  bondDegree: 21
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "IFRS IAS-2 §12 cost-of-conversion operation-time"
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.4 process-segment routing"
  - "ISO-19011:2018 audit-trail routing-changes"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations KPIs (cycle time)"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls production-control"
  - "US-GAAP ASC-330-10-30 inventory-cost"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - centers
    - hooks
    - law
    - operations
    - orders
  matrix:
    - access
    - accounting
    - centers
    - hooks
    - law
    - operations
    - orders
  backlinks:
    - access
    - accounting
    - centers
    - hooks
    - law
    - operations
    - orders
signatures:
  computationUuid: "8edc199d-4fdf-87b1-8511-8ec9962b37be"
  stages:
    - stage: path
      stageUuid: "e7aed141-56a1-89f4-9156-1aefa4fd0d81"
    - stage: trinity
      stageUuid: "323ff8d7-ec03-85e6-964b-d4b5ff61964f"
    - stage: boundary
      stageUuid: "f4f2b359-e99c-89f7-a584-a3be67878b9d"
    - stage: links
      stageUuid: "60c3e473-1804-8214-92b0-fed10bdf7755"
    - stage: horo
      stageUuid: "e2946328-a61b-8697-b531-1cf1807180f0"
    - stage: seal
      stageUuid: "bcbf5cea-67b1-88b8-8632-28d36bc262c9"
    - stage: uuid
      stageUuid: "37022d15-f61b-8c7f-947a-7d97434f596c"
version: 2
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

**Law — [[law]]: the ordered process steps that make a [[work/orders|work order]] — each step's operation, work center, and run-time per unit yield cost-of-conversion; the second universal manufacturing primitive alongside the BOM.**

Composes: [[Operations]] · [[work/centers]] · [[work/orders|WorkOrders]] · [[accounting]] · [[hooks]] · [[access]].
