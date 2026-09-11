---
name: records
description: "Use when recording or aggregating metered-billing events — per-tenant per-feature countable occurrences (invoices issued, signed PAdES attestations, country-bundle calls) with quantity, rate snapshot, billing-period bucket and idempotency key, rolled into IFRS-15 §B16 usage-based invoice lines. The metered-billing event-log collection."
atomPath: "subscription/plans/subscriptions/usage/records"
coordinate: "subscription/plans/subscriptions/usage/records · 7/descent · 349a6744"
contentUuid: "70b0c5a1-898f-567a-acb4-f16b18701370"
diamondUuid: "de1be4c8-4123-8545-ada8-446e1652577f"
uuid: "349a6744-7be4-8339-9561-420940f4fc67"
horo: 7
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
  computationUuid: "a0bb118e-ae5c-8966-8dac-bb3e1c90a365"
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
      stageUuid: "8b9de32a-1657-80cc-8a96-c1214225680f"
    - stage: seal
      stageUuid: "94afd476-fb5e-8c5f-a064-15e7f4cda506"
    - stage: uuid
      stageUuid: "602f6cec-dc0c-860e-800c-13214cd6f758"
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
