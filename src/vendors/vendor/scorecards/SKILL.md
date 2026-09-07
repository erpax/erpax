---
name: scorecards
description: "Use when scoring or reviewing vendor performance — OTD%, quality acceptance rate, price accuracy, response time, cybersecurity/ESG scores — driving ISO 9001 §8.4 renewal, probation, or de-listing recommendations. The periodic vendor performance evaluation and re-approval node."
atomPath: "vendors/vendor/scorecards"
coordinate: "vendors/vendor/scorecards · 4/weave · 0bcc612a"
contentUuid: "2a843f79-88e2-58b2-86af-5e52d8ae014d"
diamondUuid: "40ffdea7-d0ec-8c7f-89d8-2f4eb6bce3bf"
uuid: "0bcc612a-afe7-84d5-8c13-2cfe1d64f6e7"
horo: 4
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
  computationUuid: "b9e5647c-c45b-83d7-9a53-106bf311dfae"
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
      stageUuid: "a54febb7-dc50-8c41-86bc-2fc134000348"
    - stage: seal
      stageUuid: "6f5607e1-780e-88fa-bd2a-61f8db04332e"
    - stage: uuid
      stageUuid: "39675898-257b-8826-ad8b-cf9ecad41e97"
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
