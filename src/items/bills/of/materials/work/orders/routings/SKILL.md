---
name: routings
description: "Use when sequencing the process steps for a work order — operation type, work center, setup time, run-time per unit, UoM, and IAS-2 cost-of-conversion from cycle time. The ordered routing-step collection — the second universal manufacturing primitive alongside the BOM."
atomPath: "items/bills/of/materials/work/orders/routings"
coordinate: "items/bills/of/materials/work/orders/routings · 8/crest · ecc90982"
contentUuid: "66611a4b-9d17-58b7-b660-b7edbcfbbf23"
diamondUuid: "83d0193c-8215-8283-85ea-60b855d60266"
uuid: "ecc90982-38dc-8419-b3e0-889fc9e69b26"
horo: 8
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
  computationUuid: "a536ea34-01a9-8edd-b29f-4d41d36787e1"
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
      stageUuid: "37290214-a145-83dc-becd-4984ad1fc6c9"
    - stage: seal
      stageUuid: "bcbf5cea-67b1-88b8-8632-28d36bc262c9"
    - stage: uuid
      stageUuid: "160da80f-e640-85e0-a9fc-dae259932299"
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
