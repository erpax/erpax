---
name: routings
description: "Use when sequencing the process steps for a work order — operation type, work center, setup time, run-time per unit, UoM, and IAS-2 cost-of-conversion from cycle time. The ordered routing-step collection — the second universal manufacturing primitive alongside the BOM."
atomPath: "items/bills/of/materials/work/orders/routings"
coordinate: "items/bills/of/materials/work/orders/routings · 1/base · 5245d14c"
contentUuid: "cde3687b-4fcf-5cde-9e60-d0c7730708d7"
diamondUuid: "a3bbf882-cee9-8043-b841-d017d238cceb"
uuid: "5245d14c-85fd-8f9a-b314-c6b2c099472c"
horo: 1
typography:
  partition: items
  bondDegree: 21
standards:
  - "EU-537/2014"
  - "EU-910/2014"
  - "IFRS IAS-2 §12 cost-of-conversion operation-time"
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.4 process-segment routing"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations KPIs (cycle time)"
  - "ISO-22400-2:2014 manufacturing-operations KPIs (cycle time)`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls production-control"
  - "US-GAAP ASC-330-10-30 inventory-cost"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "9b14f0ce-9215-8259-83ab-544239b155ea"
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
      stageUuid: "48c408c8-0e9e-8681-9ac4-645a5b60bf59"
    - stage: seal
      stageUuid: "bcbf5cea-67b1-88b8-8632-28d36bc262c9"
    - stage: uuid
      stageUuid: "06320b53-ab49-8b20-85ae-c6cd0f0a770b"
version: 2
---
# routings

Routings — the ordered process steps that make a work-order.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-22400-2:2014 manufacturing-operations KPIs (cycle time)`
- `@standard ISO-8601-1:2019 date-time`

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
