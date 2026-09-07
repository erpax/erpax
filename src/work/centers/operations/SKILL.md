---
name: operations
description: "Use when defining reusable process-step types (Cut, Sew, Mix, Assemble, Inspect, Pack) that routings compose — with ISA-95 operation-type hierarchy, default work-center, and KPI anchors independent of any specific product. The operation-type catalog collection."
atomPath: "work/centers/operations"
coordinate: "work/centers/operations · 2/share · 94001649"
contentUuid: "cbe6c0ee-e059-57e3-979e-9f1ec599323c"
diamondUuid: "6e31ccb6-86db-862d-abb9-59136b42f7a8"
uuid: "94001649-1756-87f4-885e-9b035f94216a"
horo: 2
typography:
  partition: work
  bondDegree: 12
standards:
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations KPIs"
  - "ISO-22400-2:2014 manufacturing-operations KPIs`"
  - "SOX §404 internal-controls production-control"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "908e9a10-6d88-834f-b75e-952e62f0bcdc"
  stages:
    - stage: path
      stageUuid: "a6fad287-1878-84c9-bcd1-b1ed926ab691"
    - stage: trinity
      stageUuid: "29a09ab3-ef65-8235-b816-f4bbd2c4c753"
    - stage: boundary
      stageUuid: "e0d997d6-8e14-8b6d-8e0c-693c78dc649d"
    - stage: links
      stageUuid: "fcfa6e57-d048-807e-98b6-a9920ddde146"
    - stage: horo
      stageUuid: "85242a73-095e-840b-852e-f8239764f520"
    - stage: seal
      stageUuid: "d89c98b4-f14c-8ff7-bee8-2f5664589c31"
    - stage: uuid
      stageUuid: "512aeece-7e6e-8169-ae9c-e91b3c097675"
version: 2
---
# operations

Operations — the reusable operation-type catalog.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: operations is the reusable operation-type catalog (Cut · Sew · Mix · Assemble · Inspect · Pack) that routings compose — an ISA-95 operation-type hierarchy with default work-center and KPI anchors, defined independently of any specific product.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-22400-2:2014 manufacturing-operations KPIs`

- ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment
- ISO-22400-2:2014 manufacturing-operations KPIs
- ISO-19011:2018 audit-trail operation-definition-changes
- SOX §404 internal-controls production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[hooks]] · [[accounting]] · [[standard]] · [[field]] · [[rodin]].
