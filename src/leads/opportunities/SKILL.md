---
name: opportunities
description: "Use when tracking deals through the sales pipeline — stage progression from qualification to close-won/close-lost, weighted forecast (amount × probability), forecast categories, and contract creation on close-won. The CRM deal-pipeline collection."
atomPath: "leads/opportunities"
coordinate: "leads/opportunities · 1/base · 93f1716c"
contentUuid: "b22e562b-6ece-5330-9e34-6f27fdf61168"
diamondUuid: "fa08e315-b236-8f2d-bb26-76c8fe729a9b"
uuid: "93f1716c-9224-87c6-859b-22cdedead121"
horo: 1
typography:
  partition: leads
  bondDegree: 35
standards:
  - "IFRS IFRS-15 §9 contract-existence-criteria"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "57da2239-71ff-85a5-ba24-ade8785494b4"
  stages:
    - stage: path
      stageUuid: "1333721a-cbe5-8c00-aac6-61a11f3015ee"
    - stage: trinity
      stageUuid: "1ebf3170-09e1-88ba-9af3-e6b2c8e71522"
    - stage: boundary
      stageUuid: "d8eba5a9-7d57-8f99-9388-595077baeda2"
    - stage: links
      stageUuid: "c65ff7f9-1a5c-8bc5-b4ac-d5eccf9cddcf"
    - stage: horo
      stageUuid: "bab08e7e-d85b-8bda-8aaa-ab9a71ba04b2"
    - stage: seal
      stageUuid: "fafa7689-027c-8f52-89eb-a2488087bcad"
    - stage: uuid
      stageUuid: "cc812e13-5f32-8719-8a6f-8c51cca6150a"
version: 2
---
# opportunities

Opportunities — sales pipeline with weighted forecast.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IFRS-15 §9 contract-existence-criteria
- ISO-19011:2018 audit-trail crm-pipeline
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Activities]] · [[customer/segments]] · [[Leads]].

**Law — [[law]]: an opportunity is a deal moving through the sales pipeline — stage progression to close-won/lost with a weighted forecast (amount × probability), creating a contract on close-won; the [[leads]] graduate here.**
