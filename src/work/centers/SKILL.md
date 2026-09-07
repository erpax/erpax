---
name: centers
description: "Use when modelling manufacturing capacity — machines, lines, cells, vats, workstations, or crews — with ISA-95 resource hierarchy, throughput rate, parallelism, and IAS-2 cost-of-conversion rates feeding routing and overhead absorption. The work-center capacity-unit collection."
atomPath: "work/centers"
coordinate: "work/centers · 8/crest · 39a98996"
contentUuid: "b10f405c-298e-5f59-ad98-375b3b52532e"
diamondUuid: "c8064489-3fec-8b38-aec3-ef0738c88b43"
uuid: "39a98996-07d3-8139-982c-4b666cf6acd1"
horo: 8
typography:
  partition: work
  bondDegree: 48
standards:
  - "IFRS IAS-2 §12 cost-of-conversion fixed-and-variable-production-overhead"
  - "IFRS IAS-2 §13 normal-capacity-overhead-absorption"
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.5 production-resources equipment-hierarchy"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations KPIs (capacity, availability, utilization)"
  - "ISO-22400-2:2014 manufacturing-operations KPIs (capacity, availability, utilization)`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls production-control"
  - "US-GAAP ASC-330-10-30 inventory-cost"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "671ce890-5095-892b-ab6d-c528a224369f"
  stages:
    - stage: path
      stageUuid: "6eb6acff-21e6-8f82-bdff-d2c45930309f"
    - stage: trinity
      stageUuid: "c657b476-8566-8c6f-88d0-d19933cac19e"
    - stage: boundary
      stageUuid: "ad62df80-1530-8e7b-9e86-1a968977c6c6"
    - stage: links
      stageUuid: "b1351332-1a0a-85f1-a9b3-72760b6d81ba"
    - stage: horo
      stageUuid: "866b47b8-6be6-8235-951e-d1e45f583c81"
    - stage: seal
      stageUuid: "d0079fdd-3344-8e78-8940-b4f921b51b69"
    - stage: uuid
      stageUuid: "b70b3174-2723-813d-ac81-334bddad4ad2"
version: 2
---
# work-centers

Work Centers — the capacity unit production flows through.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: a work-center is the capacity unit production flows through (machine · line · cell · vat · workstation · crew) carrying throughput rate, parallelism, and the IAS-2 cost-of-conversion rate that feeds routing and overhead absorption — the ISA-95 resource the [[work/shifts|shift]] runs on.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-22400-2:2014 manufacturing-operations KPIs (capacity, availability, utilization)`
- `@standard ISO-8601-1:2019 date-time`

- ISA-95:2013 / IEC-62264-1 §B.5 production-resources equipment-hierarchy
- ISO-22400-2:2014 manufacturing-operations KPIs (capacity, availability, utilization)
- ISO-8601-1:2019 date-time
- IFRS IAS-2 §12 cost-of-conversion fixed-and-variable-production-overhead
- IFRS IAS-2 §13 normal-capacity-overhead-absorption
- US-GAAP ASC-330-10-30 inventory-cost
- ISO-19011:2018 audit-trail capacity-resource-changes
- SOX §404 internal-controls production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[work/shifts|WorkShifts]] · [[manufacturing]] · [[accounting]].
