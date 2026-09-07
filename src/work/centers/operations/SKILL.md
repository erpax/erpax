---
name: operations
description: "Use when defining reusable process-step types (Cut, Sew, Mix, Assemble, Inspect, Pack) that routings compose — with ISA-95 operation-type hierarchy, default work-center, and KPI anchors independent of any specific product. The operation-type catalog collection."
atomPath: "work/centers/operations"
coordinate: "work/centers/operations · 8/crest · 5ea0e929"
contentUuid: "bd476599-f637-5973-94b0-7d12dcecc2ba"
diamondUuid: "50ca54b1-0970-83f3-ac30-73ef77937658"
uuid: "5ea0e929-e764-854c-a65a-4cf0f6519f85"
horo: 8
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
  computationUuid: "4839dcbc-fb4a-862d-857f-c6bbb08ce4d8"
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
      stageUuid: "e8d72b9f-2870-89d0-b43c-2c9d82ad983f"
    - stage: seal
      stageUuid: "d89c98b4-f14c-8ff7-bee8-2f5664589c31"
    - stage: uuid
      stageUuid: "18720e84-62a2-81ec-85c0-5c2c71f24213"
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
