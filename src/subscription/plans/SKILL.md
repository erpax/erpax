---
name: plans
description: "Use when defining or displaying the SaaS pricing-plan catalog — plan names, slugs, monthly/yearly prices, Stripe product/price IDs, feature-limit JSON, billing cycle, sort order. The super-admin-maintained plan catalog collection; public read, mutations locked to super-admin."
atomPath: "subscription/plans"
coordinate: "subscription/plans · 4/weave · 4f2afbb2"
contentUuid: "c0bc2956-4f9c-5fd0-8204-3b31be93f74a"
diamondUuid: "d518f112-360b-8c63-ab56-206cdecc2cdf"
uuid: "4f2afbb2-f5bf-85d0-97da-e518f0f3e7cf"
horo: 4
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
  computationUuid: "9559a738-0775-8007-b366-fd048d67315b"
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
      stageUuid: "2a362d25-d13f-8fcf-b078-ea4ab7033a97"
    - stage: seal
      stageUuid: "eb544582-9ca1-8f9b-9259-e605fe395551"
    - stage: uuid
      stageUuid: "c8342b7e-d802-837c-bd5f-94a8a3132d3f"
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
