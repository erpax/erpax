---
name: materials
description: "Use when defining or querying the component recipe for a finished good — BOM lines, component quantities, version control per ECO, effective date ranges, and IAS-2 §10 cost-of-conversion lookup. The versioned bill-of-materials collection that seeds work-order execution and overhead absorption."
atomPath: items/bills/of/materials
coordinate: items/bills/of/materials · 1/base · 6a6ebefe
contentUuid: "378458ba-1e06-56c6-b9cf-64f4d78ac291"
diamondUuid: "3b82799a-aebf-8d63-ae82-164014fc184e"
uuid: "6a6ebefe-9020-8614-bc7b-61ca3e587ebc"
horo: 1
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
  - "ISO-19011:2018 audit-trail bom-version-control"
  - "ISO-22400-2"
  - "ISO-8601-1:2019 date-time effective-from / to"
  - "SOX §404 internal-controls bom-engineering-change-control"
  - "US-GAAP ASC-330-10-30 inventory-cost"
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
  computationUuid: "750d429c-8cea-8894-82cf-e703952f611a"
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
      stageUuid: "016fb310-4a50-8b29-8a3d-53f6427aa08d"
    - stage: seal
      stageUuid: "05195066-ede7-8221-98f5-9697ae5d3c81"
    - stage: uuid
      stageUuid: "a61a0d1f-c198-812d-9d78-0ec4aea6bb0e"
version: 2
---
# bills-of-materials

Bills of Materials (BOM) — components + quantities per finished good.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
