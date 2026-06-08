---
name: operations
description: "Use when defining reusable process-step types (Cut, Sew, Mix, Assemble, Inspect, Pack) that routings compose — with ISA-95 operation-type hierarchy, default work-center, and KPI anchors independent of any specific product. The operation-type catalog collection."
atomPath: work/centers/operations
coordinate: work/centers/operations · 5/round · 83aa00bd
contentUuid: "29720218-2d86-52f8-b8ff-6b6276cf7684"
diamondUuid: "cae0c6a9-f0de-8c56-96fa-6492ee87d539"
uuid: "83aa00bd-c952-8520-959b-ac21273f7b01"
horo: 5
bonds:
  in:
    - accounting
    - centers
    - fields
    - hooks
    - law
    - phases
    - rodin
    - routings
    - standard
  out:
    - accounting
    - fields
    - hooks
    - law
    - phases
    - rodin
    - routings
    - standard
typography:
  partition: work
  bondDegree: 24
  neighbors: []
standards:
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment"
  - "ISO-19011:2018 audit-trail operation-definition-changes"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations KPIs"
  - "SOX §404 internal-controls production-control"
bindings: []
neighbors:
  wikilink:
    - accounting
    - fields
    - hooks
    - law
    - rodin
    - standard
  matrix:
    - accounting
    - fields
    - hooks
    - law
    - phases
    - rodin
    - routings
    - standard
  backlinks:
    - accounting
    - fields
    - hooks
    - law
    - phases
    - rodin
    - routings
    - standard
signatures:
  computationUuid: "4f810f63-eb98-881b-98d2-c523e2f6b5fc"
  stages:
    - stage: path
      stageUuid: "a6fad287-1878-84c9-bcd1-b1ed926ab691"
    - stage: trinity
      stageUuid: "29a09ab3-ef65-8235-b816-f4bbd2c4c753"
    - stage: boundary
      stageUuid: "e0d997d6-8e14-8b6d-8e0c-693c78dc649d"
    - stage: links
      stageUuid: "73e54b7c-cb05-8f51-954c-cc25e34dcc87"
    - stage: horo
      stageUuid: "056b2b26-9efd-89e0-a8fc-541d945a2fe7"
    - stage: seal
      stageUuid: "eef62e4f-1ab9-8f52-896e-1da865da0722"
    - stage: uuid
      stageUuid: "a7dacab7-b29d-8860-ae78-4e658a3a98a5"
version: 2
---
# operations

Operations — the reusable operation-type catalog.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: operations is the reusable operation-type catalog (Cut · Sew · Mix · Assemble · Inspect · Pack) that routings compose — an ISA-95 operation-type hierarchy with default work-center and KPI anchors, defined independently of any specific product.**

## Standards
- ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment
- ISO-22400-2:2014 manufacturing-operations KPIs
- ISO-19011:2018 audit-trail operation-definition-changes
- SOX §404 internal-controls production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[hooks]] · [[accounting]] · [[standard]] · [[fields]] · [[rodin]].
