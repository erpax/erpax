---
name: opportunities
description: "Use when tracking deals through the sales pipeline — stage progression from qualification to close-won/close-lost, weighted forecast (amount × probability), forecast categories, and contract creation on close-won. The CRM deal-pipeline collection."
atomPath: "leads/opportunities"
coordinate: "leads/opportunities · 4/weave · c0ef92fe"
contentUuid: "bcbb3e95-15c4-51ff-9779-6bb286a48907"
diamondUuid: "64c14bb4-7a33-892f-9f38-43d6b0cd0631"
uuid: "c0ef92fe-3fe4-8086-bef9-6c76b330244e"
horo: 4
bonds:
  in:
    - activities
    - attribution
    - forecast
    - funnel
    - law
    - leads
    - leadscore
    - opportunity
    - pipeline
    - prospect
    - segments
  out:
    - activities
    - attribution
    - forecast
    - funnel
    - law
    - leads
    - leadscore
    - opportunity
    - pipeline
    - prospect
    - segments
typography:
  partition: leads
  bondDegree: 35
  neighbors: []
standards:
  - "IFRS IFRS-15 §9 contract-existence-criteria"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - activities
    - law
    - leads
    - segments
  matrix:
    - activities
    - attribution
    - forecast
    - funnel
    - law
    - leads
    - leadscore
    - opportunity
    - pipeline
    - prospect
    - segments
  backlinks:
    - activities
    - attribution
    - forecast
    - funnel
    - law
    - leads
    - leadscore
    - opportunity
    - pipeline
    - prospect
    - segments
signatures:
  computationUuid: "882b82e0-47ce-870d-8446-6a27b2cc7864"
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
      stageUuid: "33cfdb12-ce1a-8dc9-a10b-ad486b0333b6"
    - stage: seal
      stageUuid: "fafa7689-027c-8f52-89eb-a2488087bcad"
    - stage: uuid
      stageUuid: "b47ecea2-60f6-87f5-9e47-9500ddb8640c"
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
