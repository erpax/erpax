---
name: scorecards
description: "Use when scoring or reviewing vendor performance — OTD%, quality acceptance rate, price accuracy, response time, cybersecurity/ESG scores — driving ISO 9001 §8.4 renewal, probation, or de-listing recommendations. The periodic vendor performance evaluation and re-approval node."
atomPath: "vendors/vendor/scorecards"
coordinate: "vendors/vendor/scorecards · 2/share · f1ea0f4d"
contentUuid: "4c0f7861-574d-559c-a788-d84a21126af4"
diamondUuid: "4cdba2f2-49be-8b20-b7e0-02042dafb48e"
uuid: "f1ea0f4d-5587-89ec-895d-c46d9b03e939"
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
  computationUuid: "94d0bbef-5c64-8870-ad3e-5f685b569d6d"
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
      stageUuid: "e6bc1f02-a46e-8d8e-b3c1-d082d9becb04"
    - stage: seal
      stageUuid: "6f5607e1-780e-88fa-bd2a-61f8db04332e"
    - stage: uuid
      stageUuid: "e12a40a9-69f3-8318-98bd-99055de4fc16"
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
