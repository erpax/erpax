---
name: opportunities
description: "Use when tracking deals through the sales pipeline — stage progression from qualification to close-won/close-lost, weighted forecast (amount × probability), forecast categories, and contract creation on close-won. The CRM deal-pipeline collection."
atomPath: "leads/opportunities"
coordinate: "leads/opportunities · 2/share · fe835d42"
contentUuid: "7450378c-831c-5ba9-a291-217dfae75759"
diamondUuid: "add12be3-7e2e-8424-8a6a-a54710977938"
uuid: "fe835d42-7d2b-8134-b0ef-81d186a56462"
horo: 2
typography:
  partition: leads
  bondDegree: 17
standards:
  - "IFRS IFRS-15 §9 contract-existence-criteria"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "55746603-b19d-86b9-9c0e-bddd77b6df6a"
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
      stageUuid: "235de783-6fa8-8dfb-bfb9-df705b9fc6d6"
    - stage: seal
      stageUuid: "fafa7689-027c-8f52-89eb-a2488087bcad"
    - stage: uuid
      stageUuid: "c85b9378-0498-8d04-8024-a306851940c9"
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
