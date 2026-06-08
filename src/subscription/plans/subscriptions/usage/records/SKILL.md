---
name: records
description: "Use when recording or aggregating metered-billing events — per-tenant per-feature countable occurrences (invoices issued, signed PAdES attestations, country-bundle calls) with quantity, rate snapshot, billing-period bucket and idempotency key, rolled into IFRS-15 §B16 usage-based invoice lines. The metered-billing event-log collection."
atomPath: subscription/plans/subscriptions/usage/records
coordinate: subscription/plans/subscriptions/usage/records · 7/descent · 24310927
contentUuid: "09b71bb1-0e98-51da-81c1-f30eb2196b9c"
diamondUuid: "7e47c30e-8782-856c-8e31-27cc4e21d726"
uuid: "24310927-ac53-8a8d-99e2-8577349f8194"
horo: 7
bonds:
  in:
    - access
    - activities
    - consent
    - dataprotection
    - fields
    - hooks
    - identity
    - standard
    - usage
  out:
    - access
    - activities
    - consent
    - dataprotection
    - fields
    - hooks
    - identity
    - standard
typography:
  partition: subscription
  bondDegree: 30
  neighbors: []
standards:
  - "IFRS IFRS-15 §B16 §B17 §B18 §B19 usage-based-revenue"
  - "ISO-19011:2018 audit-trail usage-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time event-time billing-period"
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOC-2 CC7.4 system-monitoring-and-detection"
  - "US-GAAP ASC-606-10-32-40 usage-based-pricing"
  - "rfc-9562 uuid event-id"
bindings: []
neighbors:
  wikilink:
    - accounting
    - commerce
    - identity
    - standard
    - transaction
  matrix:
    - access
    - activities
    - consent
    - dataprotection
    - fields
    - hooks
    - identity
    - standard
  backlinks:
    - access
    - activities
    - consent
    - dataprotection
    - fields
    - hooks
    - identity
    - standard
signatures:
  computationUuid: "2dfeddea-6639-8cd1-a40b-d7bcaa84d22f"
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
      stageUuid: "aa4d40ce-d7f1-837f-b038-8705ff92d77b"
    - stage: seal
      stageUuid: "94afd476-fb5e-8c5f-a064-15e7f4cda506"
    - stage: uuid
      stageUuid: "9f4575cd-09b9-8d18-ac0e-e4862ad64539"
version: 2
---
# usage-records

Usage Records — metered-billing event log per tenant per feature.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
