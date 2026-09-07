---
name: materials
description: "Use when defining or querying the component recipe for a finished good — BOM lines, component quantities, version control per ECO, effective date ranges, and IAS-2 §10 cost-of-conversion lookup. The versioned bill-of-materials collection that seeds work-order execution and overhead absorption."
atomPath: "items/bills/of/materials"
coordinate: "items/bills/of/materials · 5/round · f04f4762"
contentUuid: "8c340e19-50c7-57f3-acea-edb119abd7fe"
diamondUuid: "43b8b515-4040-826a-9651-bf3defada75e"
uuid: "f04f4762-a52c-8507-93bc-937098fd6881"
horo: 5
typography:
  partition: items
  bondDegree: 16
standards:
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
signatures:
  computationUuid: "f7e28a3b-d86c-8ad1-a8fa-2d88315586ef"
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
      stageUuid: "4b5e7bd5-0c4a-88fa-a929-38681dade686"
    - stage: seal
      stageUuid: "05195066-ede7-8221-98f5-9697ae5d3c81"
    - stage: uuid
      stageUuid: "cb073cbb-833c-86a8-a5ae-7092a7e1bf86"
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
