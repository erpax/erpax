---
name: operations
description: "Use when defining reusable process-step types (Cut, Sew, Mix, Assemble, Inspect, Pack) that routings compose — with ISA-95 operation-type hierarchy, default work-center, and KPI anchors independent of any specific product. The operation-type catalog collection."
atomPath: "work/centers/operations"
coordinate: "work/centers/operations · 5/round · 16aef3f6"
contentUuid: "56a54150-aa7c-5ece-a111-3d73bd089457"
diamondUuid: "9e979e6c-4c7c-84d9-b4cb-aa680d6e30e0"
uuid: "16aef3f6-b4ae-8ba7-a7d5-c63365dce147"
horo: 5
typography:
  partition: work
  bondDegree: 14
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
  computationUuid: "1702190f-be09-87b2-9474-5b4ec4b9569e"
  stages:
    - stage: path
      stageUuid: "a6fad287-1878-84c9-bcd1-b1ed926ab691"
    - stage: trinity
      stageUuid: "29a09ab3-ef65-8235-b816-f4bbd2c4c753"
    - stage: boundary
      stageUuid: "e0d997d6-8e14-8b6d-8e0c-693c78dc649d"
    - stage: links
      stageUuid: "07bc8c12-f0f6-8a5e-bc83-f28e00998b76"
    - stage: horo
      stageUuid: "7c9586d3-24c0-8abe-96f8-3f24f990fae0"
    - stage: seal
      stageUuid: "d89c98b4-f14c-8ff7-bee8-2f5664589c31"
    - stage: uuid
      stageUuid: "67007a2e-cebf-84ed-8dce-52a79006e14f"
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
