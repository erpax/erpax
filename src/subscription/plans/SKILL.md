---
name: plans
description: "Use when defining or displaying the SaaS pricing-plan catalog — plan names, slugs, monthly/yearly prices, Stripe product/price IDs, feature-limit JSON, billing cycle, sort order. The super-admin-maintained plan catalog collection; public read, mutations locked to super-admin."
atomPath: "subscription/plans"
coordinate: "subscription/plans · 8/crest · 779a381f"
contentUuid: "2b40f162-196d-50d5-b78e-bfd0df30bc25"
diamondUuid: "12ec7a6e-8973-8f64-85d6-1bf927df6b2e"
uuid: "779a381f-8c9c-8581-b9ce-6064b873f0ef"
horo: 8
typography:
  partition: subscription
  bondDegree: 20
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
  computationUuid: "5b8d7a7f-3abe-8d34-ac70-eb76ca62aa8c"
  stages:
    - stage: path
      stageUuid: "0a27e08f-44d1-8b6a-8887-be59f488e5a5"
    - stage: trinity
      stageUuid: "10129d9d-0f80-81f0-bc28-eff542eb7f17"
    - stage: boundary
      stageUuid: "4d23c417-e880-80a2-8b3a-e42484622e44"
    - stage: links
      stageUuid: "eeaa1644-35f8-842a-af04-300f7403ca44"
    - stage: horo
      stageUuid: "035c0c84-cc77-8a67-94b5-c31f3e75b2ea"
    - stage: seal
      stageUuid: "eb544582-9ca1-8f9b-9259-e605fe395551"
    - stage: uuid
      stageUuid: "ddf200b0-ae3b-8972-b607-af237ba5de1d"
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

Composes: [[access]] · [[field]] · [[accounting]] · [[standard]] · [[commerce]].
