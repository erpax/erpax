---
name: records
description: "Use when recording or aggregating metered-billing events — per-tenant per-feature countable occurrences (invoices issued, signed PAdES attestations, country-bundle calls) with quantity, rate snapshot, billing-period bucket and idempotency key, rolled into IFRS-15 §B16 usage-based invoice lines. The metered-billing event-log collection."
atomPath: "subscription/plans/subscriptions/usage/records"
coordinate: "subscription/plans/subscriptions/usage/records · 1/base · 1aec3057"
contentUuid: "d14285c7-d814-5495-a6c6-b86660b2b239"
diamondUuid: "7fe59506-250d-809c-9afe-1981bac09bbe"
uuid: "1aec3057-60bd-8bc2-87b8-f5d6c034fb22"
horo: 1
typography:
  partition: subscription
  bondDegree: 30
standards:
  - "IFRS IFRS-15 §B16 §B17 §B18 §B19 usage-based-revenue"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time event-time billing-period"
  - "ISO-8601-1:2019 date-time event-time billing-period`"
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOC-2 CC7.4 system-monitoring-and-detection"
  - "US-GAAP ASC-606-10-32-40 usage-based-pricing"
  - "rfc-9562 uuid event-id"
  - "rfc-9562 uuid event-id`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "99998bde-4e40-8689-b8ba-9482d5d62986"
  stages:
    - stage: path
      stageUuid: "cf3b91a5-47b0-84b2-9675-33dfc3046663"
    - stage: trinity
      stageUuid: "cfbb90ce-e38a-8dd7-9ccc-a5cfd41209d6"
    - stage: boundary
      stageUuid: "fbcbf122-5de9-81f2-831b-8c6b13c95529"
    - stage: links
      stageUuid: "9e648e2b-6596-84c8-9297-1ee5b8195c53"
    - stage: horo
      stageUuid: "bbdefba5-b076-84e0-bd0a-a228967325be"
    - stage: seal
      stageUuid: "94afd476-fb5e-8c5f-a064-15e7f4cda506"
    - stage: uuid
      stageUuid: "19c4d96f-87b4-87d3-b3e1-22bb4dbfe96c"
version: 2
---
# usage-records

Usage Records — metered-billing event log per tenant per feature.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time event-time billing-period`
- `@standard rfc-9562 uuid event-id`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time event-time billing-period
- rfc-9562 uuid event-id
- IFRS IFRS-15 §B16 §B17 §B18 §B19 usage-based-revenue
- US-GAAP ASC-606-10-32-40 usage-based-pricing
- ISO-19011:2018 audit-trail usage-evidence
- SOC-2 CC4.1 monitoring-and-evaluation
- SOC-2 CC7.4 system-monitoring-and-detection
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[commerce]] · [[transaction]] · [[accounting]] · [[identity]] · [[standard]].
