---
name: scorecards
description: "Use when scoring or reviewing vendor performance — OTD%, quality acceptance rate, price accuracy, response time, cybersecurity/ESG scores — driving ISO 9001 §8.4 renewal, probation, or de-listing recommendations. The periodic vendor performance evaluation and re-approval node."
atomPath: "vendors/vendor/scorecards"
coordinate: "vendors/vendor/scorecards · 2/share · 9123dca4"
contentUuid: "680c7d73-5e83-54cd-869e-61aedec7e395"
diamondUuid: "b0254c37-6131-81aa-9b99-d7ffd43f7419"
uuid: "9123dca4-35a4-8676-b7af-f6fd090a31dd"
horo: 2
typography:
  partition: vendors
  bondDegree: 24
standards:
  - "ISO 9001:2015 §8.4 control-of-externally-provided-processes"
  - "ISO 9001:2015 §8.4 control-of-externally-provided-processes`"
  - "ISO 9001:2015 §8.4.1 evaluation-and-re-evaluation"
  - "ISO 9001:2015 §8.4.1 evaluation-and-re-evaluation`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "ISO-9001"
  - "SOX §404 internal-controls vendor-management"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e4cf0814-611d-8c7d-bc56-dce8ab19b80a"
  stages:
    - stage: path
      stageUuid: "63ceafff-7978-8d09-9a1e-dd026358cb01"
    - stage: trinity
      stageUuid: "59f481c5-626c-80c2-8477-5cd663e45457"
    - stage: boundary
      stageUuid: "7e27d6a5-64ca-87fa-b2e4-6a13ba90a7dc"
    - stage: links
      stageUuid: "775fed0b-13e7-8f9b-b7fc-e9ea058912b3"
    - stage: horo
      stageUuid: "ac0078cb-0614-8ecb-8e52-ac69031460c1"
    - stage: seal
      stageUuid: "6f5607e1-780e-88fa-bd2a-61f8db04332e"
    - stage: uuid
      stageUuid: "8e5ab5cd-239e-8de3-a42b-e6d3c9c6997c"
version: 2
---
# vendor-scorecards

Vendor Scorecards — periodic OTD / quality / response-time metrics.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 9001:2015 §8.4 control-of-externally-provided-processes`
- `@standard ISO 9001:2015 §8.4.1 evaluation-and-re-evaluation`
- `@standard ISO-8601-1:2019 date-time`

- ISO 9001:2015 §8.4 control-of-externally-provided-processes
- ISO 9001:2015 §8.4.1 evaluation-and-re-evaluation
- ISO-8601-1:2019 date-time
- ISO-19011:2018 audit-trail vendor-evaluation
- SOX §404 internal-controls vendor-management
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27001 A.5.19 information-security-supplier-relationships

Composes: [[identity]] · [[accounting]] · [[access]] · [[hooks]] · [[standard]].

**Law — [[law]]: a scorecard is the periodic, evidence-backed re-evaluation of one vendor (OTD / quality / response / ESG metrics) that drives the ISO 9001 §8.4 renewal, probation or de-listing decision — the supplier re-approval node.**
