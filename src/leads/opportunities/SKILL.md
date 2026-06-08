---
name: opportunities
description: "Use when tracking deals through the sales pipeline — stage progression from qualification to close-won/close-lost, weighted forecast (amount × probability), forecast categories, and contract creation on close-won. The CRM deal-pipeline collection."
atomPath: leads/opportunities
coordinate: leads/opportunities · 8/crest · dff2ec08
contentUuid: "25800e72-ab1b-5845-8e27-8353c0a1e642"
diamondUuid: "1323705d-8a40-8e46-bfe4-4629289ff049"
uuid: "dff2ec08-7570-817b-9ccc-40fd9d706dc2"
horo: 8
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
  - "ISO-19011:2018 audit-trail crm-pipeline"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
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
  computationUuid: "f4eacf77-9e40-8b04-ab50-f4277b275c60"
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
      stageUuid: "a5d09a86-e193-8fac-b578-ba6843de80d5"
    - stage: seal
      stageUuid: "2b6930c0-a034-8529-bf0c-ac7698a79740"
    - stage: uuid
      stageUuid: "a120adaf-edd5-8919-b14e-0861fe8048b3"
version: 2
---
# opportunities

Opportunities — sales pipeline with weighted forecast.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IFRS-15 §9 contract-existence-criteria
- ISO-19011:2018 audit-trail crm-pipeline
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Activities]] · [[customer/segments]] · [[Leads]].

**Law — [[law]]: an opportunity is a deal moving through the sales pipeline — stage progression to close-won/lost with a weighted forecast (amount × probability), creating a contract on close-won; the [[leads]] graduate here.**
