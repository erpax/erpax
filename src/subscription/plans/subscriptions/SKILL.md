---
name: subscriptions
description: "Use when managing a tenant's active subscription — plan binding, billing-period dates, trial/active/past-due/grace/suspended/cancelled state machine, Stripe subscription and customer IDs, cancellation and pause events, IFRS-15/ASC-606 deferred-revenue lifecycle hooks. The tenant-to-plan binding collection."
atomPath: "subscription/plans/subscriptions"
coordinate: "subscription/plans/subscriptions · 8/crest · 485603f6"
contentUuid: "cdb8a7c3-3be8-5c5a-8ee1-5b5358324e4f"
diamondUuid: "13a9e3d7-321b-8fdb-8922-ac3c263742e8"
uuid: "485603f6-089d-8f23-be23-efd30df34616"
horo: 8
typography:
  partition: subscription
  bondDegree: 27
standards:
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time period-start period-end"
  - "ISO-8601-1:2019 date-time period-start period-end`"
  - "NIST-SP-800-38D"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-340-40 deferred-contract-costs"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "aa024f83-4293-8cfd-90bd-05baf9268ff4"
  stages:
    - stage: path
      stageUuid: "8a6b4be8-8660-8607-a803-17dbc5bf5473"
    - stage: trinity
      stageUuid: "fffb7f10-9de3-80f2-9cb8-bd12cc4815fc"
    - stage: boundary
      stageUuid: "781c8b94-4688-8897-b0c1-5135fe55bf03"
    - stage: links
      stageUuid: "3828dfd8-4fbd-8d50-a4b0-1d986f302d54"
    - stage: horo
      stageUuid: "88456d8e-ed4a-88f1-8389-79056aea9982"
    - stage: seal
      stageUuid: "fdbbf58c-8bff-89bb-a22e-40b54afb0c3b"
    - stage: uuid
      stageUuid: "c32fee7a-2b17-8055-82df-f86a80990c7e"
version: 2
---
# subscriptions

Subscriptions — tenant-to-plan binding with period state and Stripe sync.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time period-start period-end`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time period-start period-end
- IFRS IFRS-15 revenue-from-contracts-with-customers
- US-GAAP ASC-606 revenue-from-contracts-with-customers
- US-GAAP ASC-340-40 deferred-contract-costs
- GDPR Art.6(1)(b) lawful-basis-contract
- SOX §404 internal-controls
- ISO-27002 §8.24 use-of-cryptography

Composes: [[subscription/plans]] · [[collections]] · [[access]] · [[proof]] · [[horo]] · [[sequence]] · [[standard]].
