---
name: materials
description: "Use when defining or querying the component recipe for a finished good — BOM lines, component quantities, version control per ECO, effective date ranges, and IAS-2 §10 cost-of-conversion lookup. The versioned bill-of-materials collection that seeds work-order execution and overhead absorption."
atomPath: "items/bills/of/materials"
coordinate: "items/bills/of/materials · 8/crest · f0643201"
contentUuid: "197287d5-d5da-594f-9b5b-78ad33151d3e"
diamondUuid: "62452bbd-0ddf-8f6e-916a-93f68e4a1587"
uuid: "f0643201-d48d-82aa-a3db-449296eb4a34"
horo: 8
bonds:
  in:
    - bundle
    - centers
    - items
    - law
    - orders
  out:
    - bundle
    - centers
    - items
    - law
    - orders
typography:
  partition: items
  bondDegree: 0
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "IFRS IAS-2 §10 §13 cost-of-conversion"
  - "IFRS IAS-2 §13 systematic-allocation-of-fixed-overheads"
  - "ISA-95"
  - "ISA-95:2013 enterprise-control-system-integration §B.4"
  - "ISO 22400:2014 manufacturing-operations-management KPIs"
  - "ISO 22400:2014 manufacturing-operations-management KPIs`"
  - "ISO-22400-2"
  - "ISO-8601-1:2019 date-time effective-from / to"
  - "ISO-8601-1:2019 date-time effective-from / to`"
  - "SOX §404 internal-controls bom-engineering-change-control"
  - "US-GAAP ASC-330-10-30 inventory-cost"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - centers
    - items
    - law
    - orders
  matrix:
    - bundle
    - centers
    - items
    - law
    - orders
  backlinks:
    - bundle
    - centers
    - items
    - law
    - orders
signatures:
  computationUuid: "82024762-cc54-85b9-b9cd-e6aa0309a69a"
  stages:
    - stage: path
      stageUuid: "0678991a-9722-84ce-95fd-3f875a126a04"
    - stage: trinity
      stageUuid: "2ec5349c-b737-8bec-a5bc-e92f36f07159"
    - stage: boundary
      stageUuid: "7e2a8eed-def0-8b9c-9d15-0147a7e02a30"
    - stage: links
      stageUuid: "0a586a94-3b81-86cc-91c0-bfdc65d37a1b"
    - stage: horo
      stageUuid: "7ae4efe5-138d-8c79-a8f0-218fef7479f9"
    - stage: seal
      stageUuid: "05195066-ede7-8221-98f5-9697ae5d3c81"
    - stage: uuid
      stageUuid: "eac1bd41-c2a8-8321-baf5-985406b32937"
version: 2
---
# bills-of-materials

Bills of Materials (BOM) — components + quantities per finished good.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time effective-from / to`
- `@standard ISO 22400:2014 manufacturing-operations-management KPIs`

- ISO-8601-1:2019 date-time effective-from / to
- ISA-95:2013 enterprise-control-system-integration §B.4
- ISO 22400:2014 manufacturing-operations-management KPIs
- IFRS IAS-2 §10 §13 cost-of-conversion
- IFRS IAS-2 §13 systematic-allocation-of-fixed-overheads
- US-GAAP ASC-330-10-30 inventory-cost
- ISO-19011:2018 audit-trail bom-version-control
- SOX §404 internal-controls bom-engineering-change-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the versioned recipe of components + quantities per finished good, controlled per engineering change, that seeds [[work/orders|work-order]] execution and cost-of-conversion absorption.**

Composes: [[work/orders|WorkOrders]] · [[Items]] · [[work/centers]].
