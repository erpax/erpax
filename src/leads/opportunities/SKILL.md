---
name: opportunities
description: "Use when tracking deals through the sales pipeline — stage progression from qualification to close-won/close-lost, weighted forecast (amount × probability), forecast categories, and contract creation on close-won. The CRM deal-pipeline collection."
atomPath: "leads/opportunities"
coordinate: "leads/opportunities · 4/weave · 4eca8c6a"
contentUuid: "041e3381-3d8d-5a0a-b226-99ac1c74a47f"
diamondUuid: "795e15d4-7c96-8606-8d5e-e31a470812b0"
uuid: "4eca8c6a-3711-80b5-88cf-e08df47193a3"
horo: 4
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
  computationUuid: "bd85493c-2ea1-818c-86e7-6b4b375ed010"
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
      stageUuid: "388508b7-b8bc-8f7b-b8e7-028b78d558fd"
    - stage: seal
      stageUuid: "fafa7689-027c-8f52-89eb-a2488087bcad"
    - stage: uuid
      stageUuid: "6cae6c43-6d53-8271-be3d-018a839a5d9e"
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
