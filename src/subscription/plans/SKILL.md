---
name: plans
description: "Use when defining or displaying the SaaS pricing-plan catalog — plan names, slugs, monthly/yearly prices, Stripe product/price IDs, feature-limit JSON, billing cycle, sort order. The super-admin-maintained plan catalog collection; public read, mutations locked to super-admin."
atomPath: "subscription/plans"
coordinate: "subscription/plans · 8/crest · d7c317a1"
contentUuid: "7afe6668-98e7-5b82-b99c-82a5ccc96dd0"
diamondUuid: "5edc5a6b-d27d-8f8f-b644-a0cf8234ff5b"
uuid: "d7c317a1-e592-82c0-8cfa-64abb7ded06c"
horo: 8
typography:
  partition: subscription
  bondDegree: 0
standards:
  - "IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "NIST-SP-800-38D"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "cbbafcc7-0f9b-8336-a697-ae45c2bafe0a"
  stages:
    - stage: path
      stageUuid: "0a27e08f-44d1-8b6a-8887-be59f488e5a5"
    - stage: trinity
      stageUuid: "10129d9d-0f80-81f0-bc28-eff542eb7f17"
    - stage: boundary
      stageUuid: "4d23c417-e880-80a2-8b3a-e42484622e44"
    - stage: links
      stageUuid: "5eab1604-a334-87b4-b168-5eba49707068"
    - stage: horo
      stageUuid: "6995beaf-b2f3-8f95-a38a-9eebb8dff067"
    - stage: seal
      stageUuid: "0aeb1f21-7999-8ca0-b6de-4089d0261c27"
    - stage: uuid
      stageUuid: "9b61d404-f041-8ead-bf78-1a3a0385a1e5"
version: 2
---
# subscription-plans

Subscription Plans — pricing-plan catalog (super-admin maintained).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`

- ISO-4217:2015 currency-codes
- IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
- US-GAAP ASC-606 revenue-from-contracts-with-customers
- SOX §404 internal-controls

Composes: [[access]] · [[fields]] · [[accounting]] · [[standard]] · [[commerce]].
